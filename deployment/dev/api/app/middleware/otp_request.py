from fastapi import status, HTTPException
from fastapi.requests import Request
from app.helpers import redis as redis_helper
from app.core import redis_client

redis = redis_client.redis

async def rate_limit_otp_request(request: Request):
    email = (await request.json())["email"]
    key = redis_helper.request_count_key(email)
    count = redis.get(key)
    if count and int(count) >= 3:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="You have reached the limit of OTP requests. Please try again after 5 minutes."
        )
    return
