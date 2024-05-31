from bson import ObjectId
from fastapi import status

from app.core import response
from app.core import database, logger
from app.entity.shop import request
from app.helpers.list import get_unique_list, parse_to_object_id
from app.models.location import add_location
from app.models.notification import find_notification_list_by_level

collection_name = "shops"


# Add shops
async def add_shop(shopInfo: request.ItemShopReq = None):
    try:
        logger.info("Shop to insert", info=shopInfo.tax_id)
        collection = database.db[collection_name]
        # kiểm tra mã số thuê
        existed = collection.find_one({"tax_id": shopInfo.tax_id})
        if existed is not None:
            logger.info("Mã số thuế đã được đăng ký", tax=shopInfo.tax_id, shop=existed)
            return existed
        # add location
        location_ids = []
        if shopInfo.location_pickup:
            try:
                for location in shopInfo.location_pickup:
                    locationInfo = await add_location(location)
                    logger.info("locationInfo", info=locationInfo)
                    if locationInfo:
                        logger.info("Location information", info=locationInfo)
                        location_ids.append(locationInfo['_id'])
            except Exception as e:
                logger.error("Failed [add_location] :", error=e)
                raise e

        shopInfo = shopInfo.dict()

        shopInfo['location_ids'] = get_unique_list(location_ids)

        insert_result = collection.insert_one(shopInfo)
        if insert_result.acknowledged:
            logger.info("Đã thêm shop mới", _id=insert_result.inserted_id, u=shopInfo)
            return collection.find_one({'_id': ObjectId(insert_result.inserted_id)})
        return None
    except Exception as e:
        logger.info("Lỗi thêm shop mới", err=e)
        raise Exception(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=str(e)
        )


async def get_shop(ids: [object] = None):
    try:
        # logger.info("Shop to insert", info=shopInfo.tax_id)
        query = {"_id": {"$in": ids}}
        collection = database.db[collection_name]
        cursor = collection.find(query)
        document_list = []
        for document in cursor:
            # Convert ObjectId to string
            document['_id'] = str(document['_id'])
            document_list.append(document)
        return response.SuccessResponse(data=document_list)
    except Exception as e:
        logger.info("Lỗi thêm shop mới", err=e)
        raise Exception(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=str(e)
        )
