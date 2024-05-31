from pydantic import BaseModel

class JWT(BaseModel):
    access_token: str
    refresh_token: str
