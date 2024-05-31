import json
from datetime import datetime

from app.core import database, logger, response
from app.static.notification import notification
from app.models import auth
from bson import ObjectId
from app.entity.notification.respones import SuccessResponseListNotification

collection_name = "notifications"


async def get_notification_list(token, page_number, page_size):
    try:
        user = await auth.get_current(token)

        collection = database.db[collection_name]
        skip_count = (page_number - 1) * page_size
        # Perform the query with pagination
        cursor = collection.find({"user_id": ObjectId(user.id)}).skip(skip_count).limit(page_size)
        document_list = []
        for document in cursor:
            # Convert ObjectId to string
            document['_id'] = str(document['_id'])
            document_list.append(document)
        return SuccessResponseListNotification(data=document_list)
    except Exception as e:
        logger.error("Failed [get_notification_list] :", error=e)


async def add_notification(item):
    try:
        collection = database.db[collection_name]
        insert_result = collection.insert_one(vars(item))
        if insert_result.acknowledged:
            return response.SuccessResponse(data=json.dumps(insert_result.acknowledged))
        return response.CustomResponse(status="success", message="Log insert", data=json.dumps(insert_result))
    except Exception as e:
        logger.error("Failed [add_notification]!", error=e)


async def find_notification_list_by_level(level: str = 'level1', projection=None):
    if projection is None:
        projection = {}
    try:
        collection = database.db[collection_name]
        cursor = collection.find({"level": level}, projection)

        notification_list = []
        for notification in cursor:
            notification_list.append(notification)
        return notification_list
    except Exception as e:
        logger.error("Failed [get_notification_by_level]!", error=e)


async def map_notification_with_user_and_shop(user_id, shop_id):
    print("user_id", user_id)
    try:
        mapped_notifications = []
        for notify in notification:
            mapped_notify = {
                "user_id": user_id,
                "shop_id": shop_id,
                **notify,
                "created_date": datetime.now(),
                "updated_date": datetime.now()
            }
            mapped_notifications.append(mapped_notify)
        collection = database.db[collection_name]

        collection.insert_many(mapped_notifications)
        logger.info("[map_notification_with_user_and_shop] Đã thêm notification cho user", user=user_id, shop=shop_id)
    except Exception as e:
        logger.error("Failed [map_notification_with_user_and_shop]!", error=e)
