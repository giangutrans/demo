from pydantic import BaseModel,Field
from typing import List, Optional, Union
from datetime import datetime
from app.entity.product.response import ItemProductRes
from app.core.response import BaseResponse, PagingSearch


class TimeRange(BaseModel):
    start_time: datetime
    end_time: datetime


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


class ProductPickupInfo(BaseModel):
    product_name: str
    product_code: str
    weight: float
    quantity: int


class ItemOrderRes(BaseModel):
    id: str = Field(..., alias='_id')
    order_code: str
    tracking_code: str
    shipper_id: int
    shipper_name: str
    status: str
    pick_from: InfoAddressOrderReq
    pick_to: InfoAddressOrderReq
    product: List[ItemProductRes] = None
    create_date: Optional[Union[datetime, None]] = None
    update_date: Optional[Union[datetime, None]] = None
    pick_range_time: Optional[Union[TimeRange, None]] = None
    delivery_range_time: Optional[Union[TimeRange, None]] = None


class SearchResponseListOrder(BaseResponse):
    paging: PagingSearch =  None
    data: List[ItemOrderRes] = []
