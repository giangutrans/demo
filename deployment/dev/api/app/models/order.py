from app.core import logger
from app.core import response
# from app.entity.order.response import SuccessResponseListOrder
from app.core import rabbitmq
from app.core import elasticsearch
from app.common.searching import pagingGen
from app.entity.order.request import SearchOrderRequest
from app.models import auth

from dotenv import load_dotenv

import os

load_dotenv()

prefix = os.getenv("PREFIX_QUEUE_NAME")
vnpost_queue = f"{prefix}_VNPOST_CREATE"
utrans_queue = f"{prefix}_UTRANS_CREATE"

collection_name = "orders"


async def get_order_list(filter: SearchOrderRequest):
    try:
        offset=(filter.current_page - 1)*filter.page_size
        if filter.current_page <= 1:
            offset=0
        
        query = {}
        # if filter.order_code != "":
        #     query["match"] = {
        #         "order_code": filter.order_code
        #     }
        docs = elasticsearch.es_client.search(index="orders", sort=[{"created_date": "desc"}], from_=offset, size=filter.page_size)
        total_rows = docs["hits"]["total"]["value"]
        logger.info(docs)
        print("Got {} hits".format(docs["hits"]["total"]["value"]))
        document_list = []
        for hit in docs["hits"]["hits"]:
            # print("{order_code} {tracking_code} ".format(**hit["_source"]))
            # logger.info("Document orders", item=hit["_source"])
            doc = hit["_source"]
            doc['_id'] = str(hit['_id'])
            document_list.append(doc)

        paging = pagingGen(filter.page_size, filter.current_page, total_rows)
        # collection = database.db[collection_name]
        # skip_count = (page_number - 1) * page_size
        # # Perform the query with pagination
        # cursor = collection.find().skip(skip_count).limit(page_size)
        # document_list = []
        # for document in cursor:
        #     # Convert ObjectId to string
        #     document['_id'] = str(document['_id'])
        #     document_list.append(document)
        return response.SuccessSearchResponse(data=document_list, paging=paging)
    except Exception as e:
        logger.error("Failed [get_order_list] :", error=e)
        return response.ErrorResponse()


async def add_order(insert_result, token):
    try:
        user = await auth.get_current(token)
        insert_result.created_by = user.email
        # TODO check 3pls
        logger.info("raw data to insert", json=insert_result)
        # call to 3pls Hook
        rabbitmq.send_message(vnpost_queue, insert_result.json())
        # insert to mongodb
        rabbitmq.send_message(utrans_queue, insert_result.json())
        return response.BaseResponse(status="success", message="Log insert", data="send message rabitmq success!")

    except Exception as e:
        logger.error("Failed [add_order] :", error=e)
        return response.BaseResponse(status="failed", message="Không thể add order")
