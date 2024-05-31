import datetime
from typing import Optional, Union

from bson import ObjectId
from pydantic import BaseModel, validator


class ItemShopLocationReq(BaseModel):
    shop_id: Optional[Union[int, None]] = None
    location_name: str
    ward_id: int
    district_id: int
    province_id: int
    address: str
    type: str = 'pickup'
    location_phone: Optional[Union[str, None]] = None
    location_contact: Optional[Union[str, None]] = None
    location_email: Optional[Union[str, None]] = None
    active: bool = True
    created_date: datetime.datetime = datetime.datetime.now()
    created_user: Optional[Union[str, None]] = None
    updated_date: Optional[Union[datetime.datetime, None]] = None
    updated_user: Optional[Union[str, None]] = None

    # @validator('shop_id', pre=True, always=True)
    # def validate_location_shop_id(cls, v):
    #     if not v:
    #         raise ValueError("Kho lấy hàng là bắt buộc.")
    #     return v

    @validator('location_name', pre=True, always=True)
    def validate_location_name(cls, v):
        if not v:
            raise ValueError("Tên kho lấy hàng là bắt buộc.")
        return v

    @validator('province_id', pre=True, always=True)
    def validate_location_province_id(cls, v):
        if not v:
            raise ValueError("Tỉnh/thành phố nơi kho lấy hàng là bắt buộc.")
        return v

    @validator('district_id', pre=True, always=True)
    def validate_location_district_id(cls, v):
        if not v:
            raise ValueError("Quận/huyện nơi kho lấy hàng là bắt buộc.")
        return v

    @validator('ward_id', pre=True, always=True)
    def validate_location_ward_id(cls, v):
        if not v:
            raise ValueError("Phường/xã nơi kho lấy hàng là bắt buộc.")
        return v

    @validator('address', pre=True, always=True)
    def validate_location_address(cls, v):
        if not v:
            raise ValueError("Địa chỉ nơi kho lấy hàng là bắt buộc.")
        return v

    @validator('location_phone', pre=True, always=True)
    def validate_location_phone(cls, v):
        if not v:
            raise ValueError("Số điện thoại kho lấy hàng là bắt buộc.")
        return v

    @validator('location_contact', pre=True, always=True)
    def validate_location_contact(cls, v):
        if not v:
            raise ValueError("Tên người liên hệ nơi kho lấy hàng là bắt buộc.")
        return v

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.created_date = datetime.datetime.now()

    class Config:
        arbitrary_types_allowed = True
        validate_assignment = True
        json_encoders = {ObjectId: str}
        use_enum_values = True


class City(BaseModel):
    name: str
    code: int


class District(BaseModel):
    name: str
    code: int
    city_code: int


class Ward(BaseModel):
    name: str
    code: int
    district_code: int
    city_code: int
