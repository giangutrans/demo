from pydantic import BaseModel, Field, ValidationError
from typing import List
from datetime import datetime
from typing import List, Optional, Union


class ItemNotificationRes(BaseModel):
    id: str = Field(..., alias='_id')
    title: str
    content: str
    active: bool
    level: str
    icon: str
    created_date: Optional[Union[datetime, None]] = None
    updated_date: Optional[Union[datetime, None]] = None
    created_user: Optional[Union[str, None]] = None
    updated_user: Optional[Union[str, None]] = None


class SuccessResponseNotification(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: ItemNotificationRes


class SuccessResponseListNotification(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: List[ItemNotificationRes]
