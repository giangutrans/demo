from fastapi import APIRouter, Form, Depends, status
from fastapi.responses import JSONResponse

from app.core import response, logger
from app.entity.user.respones import ItemUserRes
from app.middleware import middleware
from app.models import auth, user, shop

router = APIRouter()


@router.post("/login")
async def login(username: str = Form(), password: str = Form()):
    try:
        us = await user.get_by_username(username)
        if us is None:
            return JSONResponse(status_code=status.HTTP_200_OK,
                                content=response.ErrorResponse(message="Tên đăng nhập không tồn tại!").dict())
        isValid = await user.verify_user(us, password)
        if isValid is not None:
            jwt = await auth.get_token(str(us["_id"]))
            if 'shop_ids' in us and us['shop_ids']:
                res_shops = await shop.get_shop(us['shop_ids'])
                if res_shops.status == 'success':
                    us['shops'] = res_shops.data
                us['shop_ids'] = [str(item) for item in us['shop_ids']]
            res = ItemUserRes.from_mongo(us)
            res.token = jwt
            return response.SuccessResponse(data=res)
        else:
            return JSONResponse(status_code=status.HTTP_200_OK,
                                content=response.ErrorResponse(message="Tên đăng nhập hoặc mật khẩu không đúng!").dict())
    except Exception as e:
        raise e


@router.get("/logout")
async def logout(token: str = Depends(middleware.destroy_token)):
    logger.info("Đã đăng xuất, hủy token")
    return
