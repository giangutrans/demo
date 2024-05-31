from fastapi import APIRouter, Depends

from app.core import response
from app.entity.shop.location.request import ItemShopLocationReq
from app.middleware import middleware
from app.models import location
from app.models import order

router = APIRouter()


@router.get("/location/pickup", response_model=ItemShopLocationReq)
async def get_location_pickup(page: int = 1, page_size: int = 10, type: str = "pickup",
                              token: str = Depends(middleware.verify_token)):
    return await order.get_order_list(page, page_size)


@router.post("/location")
async def insert_data():
    await location.insert_location_into_elasticsearch()


@router.get("/location/cities", response_model=response.SuccessResponse)
async def get_all_cities():
    return await location.get_cities()


@router.get("/location/districts/{city_code}", response_model=response.SuccessResponse)
async def get_districts_by_city(city_code: str):
    return await location.get_districts_by_city(city_code)


@router.get("/location/wards/{district_code}", response_model=response.SuccessResponse)
async def get_wards_by_district(district_code: str):
    return await location.get_wards_by_district(district_code)
