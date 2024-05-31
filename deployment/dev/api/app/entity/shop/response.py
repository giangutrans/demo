from pydantic import BaseModel
from typing import List
from datetime import datetime


class ItemShopRes(BaseModel):
    level: str
    active: bool
    created_date: datetime
    updated_date: datetime
    updated_user: str = "thong.nguyen"
    created_user: str = "thong.nguyen"


class SuccessResponseShop(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: any
