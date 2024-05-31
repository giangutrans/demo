from pydantic import BaseModel, validator

class SearchReq(BaseModel):
    page_size: int = 10
    current_page: int = 1
