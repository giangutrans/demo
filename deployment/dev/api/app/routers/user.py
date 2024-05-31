from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from app.core import logger, response, mail, redis_client
from app.core.request import SearchReq
from app.entity.user.request import ItemUserReq, ItemOtpReq, VerifyEmailReq
from app.entity.user.respones import SuccessResponseListUser, SuccessResponseUser, SuccessVerifyEmailResponse, SuccessCreateResponseUser
from app.middleware import middleware, otp_request
from app.models import auth, user
from app.helpers import redis as redis_helper

router = APIRouter()
redis = redis_client.redis


@router.post("/users/search", response_model=SuccessResponseListUser)
async def read_users(req: SearchReq, token: str = Depends(middleware.verify_token)):
    try:
        return await user.get_user_list(req)  # Gọi hàm từ file model/users.py để lấy danh sách user
    except Exception as e:
        logger.error("Error getting user list", error=str(e))
        raise response.JsonException(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message="Internal server error"
        )


@router.post("/users/", response_model=SuccessCreateResponseUser)
async def insert_users(item: ItemUserReq):
    try:
        # curr_user = await auth.get_current(token)
        # item.created_user = curr_user.username

        return await user.add_user(item)
    except response.JsonException as e:
        logger.error("Error adding list", error=e)
        raise e
    except Exception as e:
        logger.error("Error adding user", error=str(e))
        raise response.JsonException(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message="Có lỗi hệ thống đã xảy ra, vui lòng liên hệ quản trị viên"
        )


@router.get("/users/current", response_model=SuccessResponseUser)
async def get_users(token: str = Depends(middleware.verify_token)):
    try:
        data = await auth.get_current(token)
        return SuccessResponseUser(data=data)
    except Exception as e:
        logger.error("Error getting current", error=str(e))
        raise response.JsonException(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message="Internal server error"
        )


@router.post("/users/otp")
async def send_otp(item: ItemOtpReq, otp_rate_limit: None = Depends(otp_request.rate_limit_otp_request)):
    email = item.email
    try:
        user_info = await user.get_by_email(email)

        if user_info is None:
            return JSONResponse(status_code=status.HTTP_207_MULTI_STATUS,
                                content=response.ErrorResponse(message=f"User with email {email} not found").dict())
        if user_info["verified_email_at"] is not None:
            return JSONResponse(status_code=status.HTTP_207_MULTI_STATUS,
                                content=response.ErrorResponse(message="User already verified email").dict())

        key = redis_helper.opt_key(email)
        otp = redis_client.get_decode_value(key)

        if otp is None:
            otp = middleware.generate_otp()
            redis_helper.save_otp(key, otp)

        redis_helper.update_otp_request_count_value(redis_helper.request_count_key(email))
        mail.send_hello_email(user_info["email"], otp)

        return {"message": "Otp has been sent to your mail", "otp_ttl": redis_helper.get_ttl(key)}

    except Exception as e:
        print("Error", e)
        raise response.JsonException(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message="Internal server error"
        )


@router.post("/users/email-verify", response_model=SuccessVerifyEmailResponse)
async def verify_user(request: VerifyEmailReq):
    email = request.email
    otp = redis_client.get_decode_value(redis_helper.opt_key(email))

    if otp is None or otp != request.otp:
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content=response.ErrorResponse(message="OTP is expired or not valid").dict())

    user_info = await user.get_by_email(email)
    if not user_info:
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content=response.ErrorResponse(message="Email not found").dict())

        # Check if the email has already been verified
    if user_info["verified_email_at"]:
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content=response.ErrorResponse(message="Email has been verified").dict())

    try:
        return await user.update_user_verification(email)
    except Exception as e:
        logger.error(f"Error verifying email {email}", error=str(e))
        raise response.JsonException(
            code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message="Internal server error"
        )
