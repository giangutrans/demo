import os
from datetime import datetime, timedelta

import jwt

from app.core import logger
from app.entity.user.respones import ItemUserRes
from app.helpers import redis as redis_helper
from app.middleware import middleware
from app.models import user, shop

collection_name = "authorizations"


async def get_token(username: str):
    expire = datetime.now() + timedelta(
        seconds=60 * 60 * 24  # Expired after 1 days
    )
    to_encode = {
        "exp": expire, "username": username
    }
    encoded_jwt = jwt.encode(to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))

    redis_helper.save_jwt_token(username, encoded_jwt)
    return encoded_jwt


async def get_current(token: str) -> ItemUserRes:
    try:
        payload = middleware.decodeJWT(token=token)
        userInfo = await user.get_by_id(payload.get("username"))
        res_shops = await shop.get_shop(userInfo['shop_ids'])
        if res_shops.status == 'success':
            userInfo['shops'] = res_shops.data
        userInfo['shop_ids'] = [str(item) for item in userInfo['shop_ids']]
        userInfo['token'] = token
        return ItemUserRes.from_mongo(userInfo)
    except Exception as e:
        logger.error("Error get_current", error=str(e))
        raise e
