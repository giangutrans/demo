import pandas as pd
from elasticsearch import helpers

from app.core import elasticsearch, logger
from app.helpers.constant import CITY_INDEX, DISTRICT_INDEX, WARD_INDEX


def index_data(index_name, data):
    helpers.bulk(elasticsearch.es_client, [{"_index": index_name, "_source": value} for value in data])


async def create_indices():
    # Creates Elasticsearch indices if they don't exist.
    try:
        for index in [CITY_INDEX, DISTRICT_INDEX, WARD_INDEX]:
            if not elasticsearch.es_client.indices.exists(index=index):
                elasticsearch.es_client.indices.create(index=index)

        logger.info("Successfully [create_indices]")

    except Exception as e:
        logger.error("Failed [create_indices] :", error=e)


def get_all_cities(df):
    try:
        # Extract unique city data
        cities = df[['Tỉnh Thành Phố', 'Mã TP']].drop_duplicates().rename(
            columns={'Tỉnh Thành Phố': 'name', 'Mã TP': 'code'})
        return cities.to_dict(orient='records')
    except Exception as e:
        logger.error("Failed [get_all_cities] :", error=e)


def get_all_districts(df):
    try:
        # Extract unique district data
        districts = df[['Quận Huyện', 'Mã QH', 'Mã TP']].drop_duplicates().rename(
            columns={'Quận Huyện': 'name', 'Mã QH': 'code', 'Mã TP': 'city_code'})
        return districts.to_dict(orient='records')
    except Exception as e:
        logger.error("Failed [get_all_districts] :", error=e)


def get_all_wards(df):
    try:
        # Extract unique ward data
        wards = df[['Phường Xã', 'Mã PX', 'Mã QH', 'Mã TP']].drop_duplicates()
        wards['Mã PX'] = pd.to_numeric(wards['Mã PX'], errors='coerce')
        wards = wards.rename(
            columns={'Phường Xã': 'name', 'Mã PX': 'code', 'Mã QH': 'district_code', 'Mã TP': 'city_code'})
        return wards.fillna('').to_dict(orient='records')
    except Exception as e:
        logger.error("Failed [get_all_wards] :", error=e)


def insert_es_location(df):
    try:
        create_indices()

        index_data(CITY_INDEX, get_all_cities(df))
        index_data(DISTRICT_INDEX, get_all_districts(df))
        index_data(WARD_INDEX, get_all_wards(df))
        print("Data inserted successfully")
    except helpers.BulkIndexError as e:
        print("Bulk indexing error:", e)
        for error in e.errors:
            print(error)
