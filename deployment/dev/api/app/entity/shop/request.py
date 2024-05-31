from pydantic import BaseModel, validator
from app.entity.shop.location.request import ItemShopLocationReq
from typing import List, Optional, Union
from bson import ObjectId
import datetime


class ItemShopReq(BaseModel):
    shop_name: str
    commercial_name: str
    email: str
    phone_number: str
    fanpage_url: Optional[Union[str, None]] = None
    website: Optional[Union[str, None]] = None
    shop_identity_url: Optional[Union[str, None]] = None
    tax_id: str
    industry_id: str
    shop_level_id: str = "level1"
    loyalty: str = "Miễn phí 5 đơn thành viên mới!"
    location_pickup: List[ItemShopLocationReq] = None
    va_account_id: Optional[Union[str, None]] = None
    active: bool = True
    created_date: datetime.datetime = datetime.datetime.now()
    created_user: Optional[Union[str, None]] = None
    updated_date: Optional[Union[datetime.datetime, None]] = None
    updated_user: Optional[Union[str, None]] = None

    @validator('shop_name', pre=True, always=True)
    def validate_shop_name(cls, v):
        if not v:
            raise ValueError("shop_name - Tên shop là bắt buộc")
        if not v.strip():
            raise ValueError("shop_name - Tên shop không được để trống")
        return v

    @validator('commercial_name', pre=True, always=True)
    def validate_commercial_name(cls, v):
        if not v:
            raise ValueError("commercial_name - Tên đăng ký kinh doanh là bắt buộc")
        if not v.strip():
            raise ValueError("commercial_name - Tên đăng ký kinh doanh không được để trống")
        return v

    @validator('email', pre=True, always=True)
    def validate_email(cls, v):
        if not v:
            raise ValueError("email - Email là bắt buộc")
        return v

    @validator('phone_number', pre=True, always=True)
    def validate_phone_number(cls, v):
        if not v:
            raise ValueError("phone_number - Số điện thoại là bắt buộc")
        return v

    # @validator('shop_identity_url', pre=True, always=True)
    # def validate_shop_identity_url(cls, v):
    #     if not v:
    #         raise ValueError("shop_identity_url - Hình ảnh GPKD là bắt buộc")
    #     return v

    @validator('tax_id', pre=True, always=True)
    def validate_tax_id(cls, v):
        if not v:
            raise ValueError("tax_id - Mã số thuế là bắt buộc")
        return v

    @validator('industry_id', pre=True, always=True)
    def validate_industry_id(cls, v):
        if not v:
            raise ValueError("industry_id - Nhóm ngành kinh doanh là bắt buộc")
        return v

    # @validator('shop_level_id', pre=True, always=True)
    # def validate_shop_level_id(cls, v):
    #     if not v:
    #         raise ValueError("shop_level_id - Tên nhóm, cấp độ phân loại là bắt buộc")
    #     return v

    # @validator('va_account_id', pre=True, always=True)
    # def validate_va_account_id(cls, v):
    #     if not v:
    #         raise ValueError("va_account_id - Tài khoản liên kết là bắt buộc")
    #     return v

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.created_date = datetime.datetime.now()

    class Config:
        arbitrary_types_allowed = True
        validate_assignment = True
        json_encoders = {ObjectId: str}
        use_enum_values = True
