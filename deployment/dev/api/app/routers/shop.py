from fastapi import APIRouter, FastAPI, Depends

from app.core import response
from app.entity.order.request import ItemOrderReq
from app.entity.order.response import SearchResponseListOrder
from app.middleware import middleware
from app.models import order

router = APIRouter()


@router.get("/shop/", response_model=SearchResponseListOrder)
async def get_all_order(page: int = 1, page_size: int = 10, token: str = Depends(middleware.verify_token)):
    return await order.get_order_list(page, page_size)


@router.post("/shop/", response_model=response.BaseResponse)
async def add_order(item: ItemOrderReq, token: str = Depends(middleware.verify_token)):
    return await order.add_order(item)
