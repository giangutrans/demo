from fastapi import APIRouter, Depends

from app.core import logger, response
from app.entity.order.request import ItemOrderReq, SearchOrderRequest
from app.entity.order.response import SearchResponseListOrder
from app.middleware import middleware
from app.models import order

router = APIRouter()


@router.post("/order/search", response_model=SearchResponseListOrder)
async def get_all_order(filter: SearchOrderRequest):
    return await order.get_order_list(filter)


@router.post("/order/", response_model=response.BaseResponse)
async def add_order(item: ItemOrderReq, token: str = Depends(middleware.verify_token)):
    logger.info("Add order", item=item)
    return await order.add_order(item, token)
