# import json
from pydantic import BaseModel
from app.core import database, logger

class Users(BaseModel):
    _id: str
    username: str
    password: str

collection_name = "users"


# cl_names = database.db.list_collection_names()
# y = json.dumps(cl_names)
# print("Database collection names ", y )

# Get users list
async def get_user_list():
    users = []
    collection = database.db[collection_name]

    async for user in collection.find():
        users.append(user)
    return users

# Add users
async def add_user():
    collection = database.db[collection_name]

    mydict = { "username": "Peter", "password": "Lowstreet27" }

    x = collection.insert_one(mydict)

    logger.Info(x.inserted_id)

    return
