from fastapi import APIRouter, FastAPI, Depends
from app.middleware import middleware

router = APIRouter()

@router.get("/protected")
async def protected_route(token: str = Depends(middleware.verify_token)):
    # Nếu token hợp lệ, chương trình sẽ tiếp tục xử lý request
    return {"message": "Đã xác thực token"}