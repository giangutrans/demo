from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


security = HTTPBearer()

def verify_token(cred: HTTPAuthorizationCredentials = Depends(security)):
    # Kiểm tra xác thực token ở đây (ví dụ: kiểm tra JWT)
    # Thông thường, bạn sẽ sử dụng thư viện như PyJWT để thực hiện việc này
    # Điều này có thể bao gồm kiểm tra chữ ký của token và xác minh thông tin người dùng

    # Giả sử ta chỉ kiểm tra xem token có tồn tại không để đơn giản hóa
    if not cred:
        raise HTTPException(status_code=401, detail="Token không hợp lệ")
    return cred.credentials
