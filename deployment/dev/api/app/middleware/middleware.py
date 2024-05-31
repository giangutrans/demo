import os
import secrets
import string

import bcrypt
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from app.core import logger, response
from app.helpers import redis as redis_helper

collection_name = "authorizations"
security = HTTPBearer(
    scheme_name='Authorization'
)


def verify_token(cred: HTTPAuthorizationCredentials = Depends(security)):
    if not cred:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Không có mã xác thực")
    if not cred.scheme == "Bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Mã xác thực không hợp lệ")
    if not validate_jwt(cred.credentials):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Mã xác thực không hợp lệ hoặc đã phiên đăng nhập đã hết hạn")
    return cred.credentials


def destroy_token(cred: HTTPAuthorizationCredentials = Depends(security)):
    if not cred:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Không có mã xác thực")
    if not cred.scheme == "Bearer":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Mã xác thực không hợp lệ")
    updateDestroyToken(decodeJWT(cred.credentials))


def validate_jwt(jwtoken: str) -> bool:
    global payload
    isTokenValid: bool = False
    try:
        payload = decodeJWT(jwtoken)
    except:
        payload = None

    if payload:
        isTokenValid = checkValidateToken(payload["username"])
    if not isTokenValid:
        updateDestroyToken(payload)

    return isTokenValid


def checkValidateToken(username: str):
    token = redis_helper.get_jwt_token(username)
    return True if token else False


def decodeJWT(token: str) -> dict:
    global payload
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")])
        return payload

    except jwt.ExpiredSignatureError:
        updateDestroyToken(payload)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Token has expired"
        )

    except(jwt.PyJWTError, ValidationError) as e:
        logger.error("Token decoding", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Could not validate credentials",
        )


def updateDestroyToken(payload):
    try:
        redis_helper.delete_jwt_token(payload["username"])
    except Exception as e:
        logger.error("updateDestroyToken", error=str(e))
        raise response.JsonException(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=e.__str__()
        )


def hash_password(password):
    password_bytes = password.encode('utf-8')
    hashed_bytes = bcrypt.hashpw(password_bytes, bcrypt.gensalt(rounds=13, prefix=b"2b"))
    return hashed_bytes.decode('utf-8')


def generate_otp():
    alphabet = string.digits + string.ascii_uppercase  # Generates OTP using digits and uppercase letters
    return ''.join(secrets.choice(alphabet) for _ in range(6))  # Creates a 6-character OTP
