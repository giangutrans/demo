from app.core import database, logger
from app.core import response
import json
collection_name = "products"


async def get_product_list(page_number, page_size):
    try:
        collection = database.db[collection_name]
        skip_count = (page_number - 1) * page_size
        cursor = collection.find().skip(skip_count).limit(page_size)
        document_list = []
        for document in cursor:
            # Convert ObjectId to string
            document['_id'] = str(document['_id'])
            document_list.append(document)
        return response.SuccessResponse(data=document_list)
    except Exception as e:
        logger.error("Failed [get_order_list] :", error=e)


async def add_product(item):
    try:
        collection = database.db[collection_name]
        insert_result = collection.insert_one(vars(item))
        if insert_result.acknowledged:
            return response.SuccessResponse(data=json.dumps(insert_result.acknowledged))
        return response.CustomResponse(status="success", message="Log insert", data=json.dumps(insert_result))
    except Exception as e:
        logger.error("Failed [add_product]!", error=e)
