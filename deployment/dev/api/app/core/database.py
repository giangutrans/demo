from urllib.parse import quote_plus
from dotenv import load_dotenv
from app.core import logger
import pymongo
import os

load_dotenv()
db_host = os.getenv("MONGO_HOST")
db_port = os.getenv("MONGO_PORT")
db_user = os.getenv("API_MONGO_USER")
db_pwd = os.getenv("API_MONGO_PWS")
db_name = os.getenv("API_MONGO_DB")

encoded_user = quote_plus(db_user)
encoded_pwd = quote_plus(db_pwd)
conn = f"mongodb+srv://{encoded_user}:{encoded_pwd}@{db_host}/{db_name}?replicaSet=rs0&authSource={db_name}&ssl=false"
logger.info("Url mongo : " + conn)
try:
    # Connect to MongoDB
    client = pymongo.MongoClient(conn)
    db = client[db_name]
    logger.info("Kết nối MongoDB thành công!")

except Exception as e:
    logger.error("Lỗi khi kết nối MongoDB!", error=e)
