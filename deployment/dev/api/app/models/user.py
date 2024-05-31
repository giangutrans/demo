import json
from datetime import datetime

import bcrypt
import bson
from fastapi import status

from app.core import database, logger, response, mail
from app.core.request import SearchReq
from app.entity.user import request
from app.entity.user.respones import SuccessVerifyEmailResponse, SuccessCreateResponseUser
from app.helpers import redis as redis_helper
from app.helpers.list import get_unique_list
from app.middleware import middleware
from app.models.notification import map_notification_with_user_and_shop
from app.models.shop import add_shop

collection_name = "users"


# verify user with password
async def verify_user(us: any, p: str):
    try:
        if us is None:
            return None
        if bcrypt.checkpw(p.encode('utf-8'), us['password'].encode('utf-8')):
            logger.info("Đã đăng nhập thành công", username=us['username'])
            return us
        return None

    except Exception as e:
        raise response.JsonException(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=e.__str__()
        )


# Get one by id 
async def get_by_id(id: str):
    collection = database.db[collection_name]
    return collection.find_one({"_id": bson.ObjectId(id)})


# Get one by username
async def get_by_username(uname: str):
    collection = database.db[collection_name]
    return collection.find_one({"username": uname})


# Get one by email
async def get_by_email(email: str):
    collection = database.db[collection_name]
    return collection.find_one({"email": email})


# Get users list
async def get_user_list(req: SearchReq):
    collection = database.db[collection_name]
    skip_count = (req.current_page - 1) * req.page_size
    # Perform the query with pagination
    cursor = collection.find().skip(skip_count).limit(req.page_size)
    document_list = []
    for document in cursor:
        # Convert ObjectId to string
        document['_id'] = str(document['_id'])
        document_list.append(document)

    return response.SuccessResponse(data=document_list)


async def validate_add_user(uAccount: request.ItemUserReq = None):
    if uAccount is None:
        logger.error("Vui lòng nhập thông tin user.")
        raise response.JsonException(
            code=status.HTTP_400_BAD_REQUEST,
            message='Vui lòng nhập thông tin user.'
        )

    # Check existed
    existsUser = await get_by_username(uAccount.username)
    if existsUser is not None:
        logger.info("Username đã tồn tại", name=uAccount.username)
        raise response.JsonException(
            code=status.HTTP_400_BAD_REQUEST,
            message='Email đã tồn tại.'
        )
    return


# Add users
async def add_user(uAccount: request.ItemUserReq = None):
    try:
        await validate_add_user(uAccount)
    except response.JsonException as e:
        return response.BaseResponse(code=e.code, message=e.message)

    shop_ids = []
    if uAccount.shops:
        try:
            for shop_data in uAccount.shops:
                # shop_data.created_user = uAccount.created_user
                shopInfo = await add_shop(shop_data)
                if shopInfo:
                    logger.info("Shop information", info=shopInfo)
                    shop_ids.append(shopInfo['_id'])
        except Exception as e:
            logger.error("Failed [add_shop] :", error=e)
            raise e

    try:
        collection = database.db[collection_name]
        uAccount_dict = uAccount.dict()

        uAccount_dict['shop_ids'] = get_unique_list(shop_ids)
        uAccount_dict['location_ids'] = get_unique_list(shopInfo['location_ids'])

        uAccount_dict['password'] = middleware.hash_password(uAccount.password)
        del uAccount_dict['shops']
        insert_result = collection.insert_one(uAccount_dict)

        if insert_result.acknowledged:
            await map_notification_with_user_and_shop(insert_result.inserted_id, uAccount_dict['shop_ids'][0] if len(
                uAccount_dict['shop_ids']) > 0 else None
                                                      )
            otp = middleware.generate_otp()
            mail.send_hello_email(uAccount_dict['username'], otp)
            redis_helper.save_otp_and_update_request_count(uAccount_dict['username'], otp)  # set otp and count request
            logger.info("[add_user] Đã thêm user mới", _id=insert_result.inserted_id)
            return SuccessCreateResponseUser(data=json.dumps(insert_result.acknowledged), otp_ttl=redis_helper.get_ttl(
                redis_helper.opt_key(uAccount_dict['username'])), email=uAccount_dict['email'])
        return response.CustomResponse(status="success", message="Log insert", data=json.dumps(insert_result))
    except Exception as e:
        logger.error("Failed [add_user] :", error=e)
        raise Exception(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=str(e)
        )


async def update_user_verification(email: str):
    try:
        collection = database.db[collection_name]
        collection.update_one({"username": email}, {"$set": {"verified_email_at": datetime.utcnow()}})
        return SuccessVerifyEmailResponse()
    except response.JsonException as e:
        return response.BaseResponse(code=e.code, message=e.message)
