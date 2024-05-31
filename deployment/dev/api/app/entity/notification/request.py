from pydantic import BaseModel, validator
from datetime import datetime
from bson import ObjectId


class ItemNotificationReq(BaseModel):
    title: str
    content: str
    active: bool = True
    level: str
    icon: str
    created_date: datetime = datetime.now()
    updated_date: datetime = datetime.now()
    created_user: str = None
    updated_user: str = None

    @validator('title', pre=True, always=True)
    def validate_title(cls, v):
        if not v:
            raise ValueError("title - Tiêu đề là bắt buộc")
        if not v.strip():
            raise ValueError("title - Tiêu đề không được để trống")
        return v

    @validator('content', pre=True, always=True)
    def validate_content(cls, v):
        if not v:
            raise ValueError("content - Nội dung là bắt buộc")
        if not v.strip():
            raise ValueError("content - Nội dung không được để trống")
        return v

    class Config:
        arbitrary_types_allowed = True
        validate_assignment = True
        json_encoders = {ObjectId: str}
        use_enum_values = True
