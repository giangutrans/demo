from pydantic import BaseModel

class ItemTrackingReq(BaseModel):
    tracking_code: int
    shipper_id: int
    shipper_name : str
    status: str
    comments :str
    timestamp: int
