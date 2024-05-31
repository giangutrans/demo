from pydantic import BaseModel
from typing import List
from datetime import datetime


class ItemTrackingRes(BaseModel):
    tracking_number: int
    timestamp: int
    shipper_id: int
    shipper_name : str
    status : str
    # created_date: datetime
    # updated_date: datetime

class SuccessResponseListTracking(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: List[ItemTrackingRes]
