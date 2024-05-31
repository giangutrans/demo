from pydantic import BaseModel
from typing import List
from datetime import datetime

class ItemRoleReq(BaseModel):
    role_name: str
    active:bool
