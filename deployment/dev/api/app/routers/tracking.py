from fastapi import APIRouter, FastAPI, Depends

from app.core import response
from app.entity.tracking.request import ItemTrackingReq
from app.entity.tracking.response import ItemTrackingRes, SuccessResponseListTracking
from app.middleware import middleware
from app.models import tracking

router = APIRouter()


@router.get("/trackings/", response_model=SuccessResponseListTracking)
async def get_all_trackings(page: int = 1, page_size: int = 10, token: str = Depends(middleware.verify_token)):
    return await tracking.get_tracking_list(page, page_size)


@router.post("/trackings/", response_model=response.BaseResponse)
async def add_trackings(item: ItemTrackingReq, token: str = Depends(middleware.verify_token)):
    return await tracking.add_tracking(item)
