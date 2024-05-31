from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
from app.core import logger, response, exception
from app.routers import auth, tracking, user, order, shop, product, notification, location
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # Add other origins if necessary
    "https://shop-stg.utrans.vn"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(response.JsonException, exception.json_exception_handler)
app.add_exception_handler(RequestValidationError, exception.validation_exception_handler)

app.include_router(auth.router, prefix="/v1", tags=["Auth"])
app.include_router(user.router, prefix="/v1", tags=["User"])
app.include_router(tracking.router, prefix="/v1", tags=["Tracking"])
app.include_router(order.router, prefix="/v1", tags=["Order"])
app.include_router(shop.router, prefix="/v1", tags=["Shop"])
app.include_router(product.router, prefix="/v1", tags=["Product"])
app.include_router(notification.router, prefix="/v1", tags=["Notification"])
app.include_router(location.router, prefix="/v1", tags=["Location"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
