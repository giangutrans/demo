from elasticsearch import Elasticsearch
from dotenv import load_dotenv
import os

load_dotenv()

es_host = os.getenv('ES_HOST')
es_port = os.getenv('ES_PORT')

es_client = Elasticsearch([f"http://{es_host}:{es_port}"], http_auth=(os.getenv('ES_USER'), os.getenv('ES_PW')))
