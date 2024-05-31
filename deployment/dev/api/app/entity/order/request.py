from pydantic import BaseModel
from typing import List
from datetime import datetime
from app.core.request import SearchReq
from app.entity.product.request import ItemProductReq


class TimeRange(BaseModel):
    session: str
    start_time: datetime
    end_time: datetime


class SearchOrderRequest(SearchReq):
    order_code: str = ""


class AddressOrderReq(BaseModel):
    address: str
    ward: str
    district: str
    province: str
    postcode: str


class InfoAddressOrderReq(BaseModel):
    name: str
    phone_number: str
    email: str
    address: AddressOrderReq


class ItemOrderReq(BaseModel):
    order_code: str
    tracking_code: str
    shipper_id: int
    shipper_name: str
    status: str
    pick_from: InfoAddressOrderReq
    pick_to: InfoAddressOrderReq
    product: List[ItemProductReq]
    weight: int = 0
    is_broken: str = "0"
    delivery_range_time: TimeRange
    created_by: str = "system_auto_utrans"
    # created_date: datetime
    # updated_date: datetime
