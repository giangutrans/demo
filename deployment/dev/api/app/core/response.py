from pydantic import BaseModel
from typing import Any


class BaseResponse(BaseModel):
    code: int = 200
    status: str = None
    message: str = None
    data: Any = None


class SuccessResponse(BaseModel):
    status: str = "success"
    message: str = "Thành công!"
    data: Any = None

class SuccessSearchResponse(SuccessResponse):
    paging: Any = None

class PagingSearch(BaseModel):
    total_pages: int = 1
    total_rows: int = 1
    current_page: int = 1
    page_size: int = 10

class ErrorResponse(BaseModel):
    status: str = "fail"
    message: str = "Lỗi!"
    data: Any = None


class CustomResponse:
    # Define a response model for success
    def __init__(self, status, message, data):
        self.status = status
        self.message = message
        self.data = data


class JsonException(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
