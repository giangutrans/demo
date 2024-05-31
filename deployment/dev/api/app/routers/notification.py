from fastapi import APIRouter, Depends, status

from app.entity.notification.request import ItemNotificationReq
from app.entity.notification.respones import SuccessResponseListNotification
from app.middleware import middleware
from app.models import notification
from app.core import response

router = APIRouter()


@router.post("/notifications/", response_model=response.BaseResponse)
async def add_notification(item: ItemNotificationReq, token: str = Depends(middleware.verify_token)):
    return await notification.add_notification(item)


@router.get("/notifications/", response_model=SuccessResponseListNotification)
async def list_notifications(page: int = 1, page_size: int = 10, token: str = Depends(middleware.verify_token)):
    return await notification.get_notification_list(token, page, page_size)
