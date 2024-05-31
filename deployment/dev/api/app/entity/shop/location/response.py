from pydantic import BaseModel
from app.entity.shop.location.request import ItemShopLocationReq

class SuccessResponseLocationPickup(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: any
