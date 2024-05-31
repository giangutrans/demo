import os

import pandas as pd
from bson import ObjectId
from elasticsearch import helpers
from fastapi import status

from app.core import database, logger
from app.core import elasticsearch
from app.core import response
from app.entity.shop.location import request
from app.entity.shop.location.request import City, District, Ward
from app.helpers.es_location import insert_es_location

collection_name = "locations"


async def get_location_list(page_number, page_size, type):
    try:
        collection = database.db[collection_name]
        skip_count = (page_number - 1) * page_size
        # Perform the query with pagination
        cursor = collection.find({'type': type}).skip(skip_count).limit(page_size)
        document_list = []
        for document in cursor:
            # Convert ObjectId to string
            document['_id'] = str(document['_id'])
            document_list.append(document)
        return response.SuccessResponse(data=document_list)
    except Exception as e:
        logger.error("Failed [get_order_list] :", error=e)


async def add_location(locationInfo: request.ItemShopLocationReq = None):
    try:
        logger.info("Location to insert", info=locationInfo.location_name)
        collection = database.db[collection_name]
        locationInfo = locationInfo.dict()
        insert_result = collection.insert_one(locationInfo)
        if insert_result.acknowledged:
            logger.info("Đã thêm location mới", _id=insert_result.inserted_id, u=locationInfo)
            return collection.find_one({'_id': ObjectId(insert_result.inserted_id)})
        return None
    except Exception as e:
        logger.info("Lỗi thêm shop mới", err=e)
        raise Exception(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=str(e)
        )


def index_data(index_name, data):
    helpers.bulk(elasticsearch.es_client, [{"_index": index_name, "_source": value} for value in data])


async def insert_location_into_elasticsearch():
    excel_file = os.path.join('app/static', 'location.xlsx')
    print("excel_file", excel_file)
    df = pd.read_excel(excel_file, engine='openpyxl')

    insert_es_location(df)


async def get_cities():
    query = {"query": {"match_all": {}}, "size": 65}
    es_response = elasticsearch.es_client.search(index="cities", body=query)
    data = [City(**hit["_source"]) for hit in es_response["hits"]["hits"]]
    return response.SuccessResponse(data=data)


async def get_districts_by_city(city_code: str):
    query = {"query": {"match": {"city_code": city_code}}, "size": 1000}
    es_response = elasticsearch.es_client.search(index="districts", body=query)
    data = [District(**hit["_source"]) for hit in es_response["hits"]["hits"]]
    return response.SuccessResponse(data=data)


async def get_wards_by_district(district_code: str):
    query = {"query": {"match": {"district_code": district_code}}, "size": 1000}
    es_response = elasticsearch.es_client.search(index="wards", body=query)
    data = [Ward(**hit["_source"]) for hit in es_response["hits"]["hits"]]
    return response.SuccessResponse(data=data)
