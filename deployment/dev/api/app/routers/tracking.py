from fastapi import APIRouter, FastAPI, Depends
from app.middleware import middleware

router = APIRouter()

@router.get("/trackings/")
async def read_trackings(token: str = Depends(middleware.verify_token)):
    return [{"name": "Tracking Foo"}, {"name": "Tracking Bar"}]
