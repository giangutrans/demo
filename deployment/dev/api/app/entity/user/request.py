from typing import List
from pydantic import BaseModel, validate_email, validator, root_validator, EmailStr
from bson import ObjectId

import datetime

from app.common import password
from app.entity.shop.request import ItemShopReq
from app.entity.shop import request
from app.middleware import middleware


class ItemUserReq(BaseModel):
    username: str
    password: str
    email: EmailStr
    kyc_status_id: int = None
    kyc_fullname: str = None
    kyc_identity_id: str = None
    kyc_birthday: datetime.datetime = None
    kyc_identity_address: str = None
    kyc_released_date: datetime.datetime = None
    image_url: str = None
    role_id: str = "master_account"
    verified_email_at: datetime.datetime = None
    active: bool = True
    created_date: datetime.datetime = datetime.datetime.now()
    created_user: str = None
    updated_date: datetime.datetime = None
    updated_user: str = None
    shops: List[ItemShopReq] = None
    gender: str = "male"

    @root_validator(pre=True)
    def validate_root(cls, values):
        if 'username' not in values or not values['username']:
            raise ValueError("Email/tên đăng nhập là bắt buộc.")
        if 'password' not in values or not values['password']:
            raise ValueError("Mật khẩu là bắt buộc.")
        # if 'role_id' not in values or not values['role_id']:
        #     raise ValueError("Loại tài khoản là bắt buộc.")
        # if 'shop_info' not in values or not values['shop_info']:
        #     raise ValueError("Thông tin shop là bắt buộc.")
        return values

    @validator('username', always=True)
    def validate_username(cls, v):
        if not v.strip():
            raise ValueError("Email/tên đăng nhập không được để trống.")
        # try:
        #     # Kiểm tra định dạng email sử dụng email_validator
        #     validate_email(v)
        # except Exception:
        #     raise ValueError("Email/tên đăng nhập không đúng định dạng")

        return v

    @validator('password', pre=True, always=True)
    def validate_password_length(cls, v):
        if not v.strip():
            raise ValueError("Mật khẩu không được để trống.")
        password.validate_password(v)
        return v

    @validator('kyc_birthday')
    def validate_birthday(cls, v):
        if v.replace(tzinfo=None) > datetime.datetime.now():
            raise ValueError("Ngày sinh không thể lớn hơn ngày hiện tại")
        return v

    @validator('role_id', pre=True, always=True, check_fields=True)
    def validate_role_ide(cls, v):
        if not v.strip():
            raise ValueError("Loại tài khoản không được để trống.")
        return v

    # @validator('shop_info', pre=True, always=True, check_fields=True, each_item=True)
    # def validate_shop_info(cls, v):
    #     if not v:
    #         raise ValueError("Thông tin shop là bắt buộc")
    #     return v

    class Config:
        arbitrary_types_allowed = True
        validate_assignment = True
        json_encoders = {ObjectId: str}
        use_enum_values = True


class ItemOtpReq(BaseModel):
    email: str

    @validator('email', always=True)
    def validate_email(cls, v):
        if not v.strip():
            raise ValueError("Email/tên đăng nhập không được để trống.")

        return v

class VerifyEmailReq(ItemOtpReq):
    otp: str
    @validator('otp')
    def otp_length(cls, value):
        if len(value) != 6:
            raise ValueError("OTP must be 6 characters long")
        return value
