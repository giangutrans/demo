from pydantic import BaseModel
from typing import List
from datetime import datetime


class ItemRoleRes(BaseModel):
    role_name: str
    active: bool


class SuccessResponseListRole(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: List[ItemRoleRes]
