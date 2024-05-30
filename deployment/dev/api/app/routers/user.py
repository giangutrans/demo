from fastapi import APIRouter, FastAPI, Depends
from app.middleware import middleware
from app.models import user

router = APIRouter()

@router.get("/users/")
async def read_users(token: str = Depends(middleware.verify_token)):
    return await user.get_user_list()

@router.post("/users/")
async def insert_users(token: str = Depends(middleware.verify_token)):
    return await user.add_user()
