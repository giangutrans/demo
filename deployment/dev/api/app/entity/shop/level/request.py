from pydantic import BaseModel, validator
from bson import ObjectId

from app.common import password
import datetime

class ItemShopLevelReq(BaseModel):
    level: str
    active: bool = True
    created_date: datetime.datetime = datetime.datetime.now()
    created_user: str = None
    updated_date: datetime.datetime = None
    updated_user: str = None

    @validator('level', pre=True, always=True)
    def validate_shop_level(cls, v):
        if not v:
            raise ValueError("Tên nhóm, cấp độ phân loại là bắt buộc.")
        return v

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.created_date = datetime.datetime.now()

    class Config:
        arbitrary_types_allowed = True
        validate_assignment = True
        json_encoders = {ObjectId: str}
        use_enum_values = True
