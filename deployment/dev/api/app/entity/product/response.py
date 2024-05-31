from pydantic import BaseModel
from typing import List
from datetime import datetime


class ItemProductRes(BaseModel):
    product_code: str
    product_name: str
    shop_location: str
    type: str
    quantity: int = 0
    height: float = 0
    weight: float = 0
    long: float = 0
    # price: float
    # active: bool
    # created_date: datetime
    # updated_date: datetime
    # updated_user: str = "thong.nguyen"
    # created_user: str = "thong.nguyen"


class SuccessResponseListProduct(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: List[ItemProductRes]
