from pydantic import BaseModel
from typing import List
from datetime import datetime


class ItemProductReq(BaseModel):
    product_code: str
    product_name: str
    shop_location: str
    quantity: int = 0
    height: float = 0
    weight: float = 0
    long: float = 0
    type: str = "order"
    price: float = 0
    active: bool = True
