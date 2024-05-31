from fastapi import APIRouter, FastAPI, Depends

from app.core import response
from app.entity.order.request import ItemOrderReq
from app.entity.order.response import SearchResponseListOrder
from app.middleware import middleware
from app.models import product


router = APIRouter()


@router.get("/product/")
async def get_all_order(page: int = 1, page_size: int = 10, token: str = Depends(middleware.verify_token)):
    return await product.get_product_list(page, page_size)


@router.post("/product/", response_model=response.BaseResponse)
async def add_order(item: ItemOrderReq, token: str = Depends(middleware.verify_token)):
    return await product.add_product(item)
