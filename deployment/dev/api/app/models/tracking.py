from pydantic import BaseModel

class Trackings(BaseModel):
    uid: str
    tracking_number: str
    tracking_date: str
    order_number: str
    order_date: str
    created_by: str
