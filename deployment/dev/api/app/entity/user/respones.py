from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Union

from app.core.response import SuccessResponse
from app.entity.shop.request import ItemShopReq
from app.entity.shop.request import ItemShopReq

import datetime


class ItemUserRes(BaseModel):
    id: str = Field(..., alias='_id')
    username: str
    email: EmailStr = None
    kyc_status_id: Optional[Union[str, None]] = None
    kyc_fullname: Optional[Union[str, None]] = None
    kyc_identity_id: Optional[Union[str, None]] = None
    kyc_birthday: Optional[Union[datetime.datetime, None]] = None
    kyc_identity_address: Optional[Union[str, None]] = None
    kyc_released_date: Optional[Union[datetime.datetime, None]] = None
    image_url: Optional[Union[str, None]] = None
    role_id: Optional[Union[str, None]] = None
    active: bool = True
    verified_email_at: Optional[Union[datetime.datetime, None]] = None
    created_date: Optional[Union[datetime.datetime, None]] = None
    created_user: Optional[Union[str, None]] = None
    updated_date: Optional[Union[datetime.datetime, None]] = None
    updated_user: Optional[Union[str, None]] = None
    shops: Optional[Union[List[ItemShopReq], None]] = None
    shop_ids: Optional[Union[List[str], None]] = None
    token: Optional[Union[str, None]] = None

    @classmethod
    def from_mongo(cls, data):
        data['_id'] = str(data.get('_id'))
        return cls(**data)


class SuccessCreateResponseUser(SuccessResponse):
    otp_ttl: int
    email: str


class SuccessResponseUser(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: ItemUserRes


class SuccessResponseListUser(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: List[ItemUserRes]


class SuccessVerifyEmailResponse(BaseModel):
    status: str = "success"
    message: str = "Xác thực email thành công!"
