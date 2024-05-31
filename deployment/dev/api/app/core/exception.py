from fastapi import Request, status #import class FastAPI()
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from app.core import response, logger

async def json_exception_handler(request: Request, exc: response.JsonException):
    logger.error(f"JsonException occurred: {jsonable_encoder(exc)}")
    return JSONResponse(
        status_code=exc.code,
        content={"message": exc.message},
    )


async def validation_exception_handler(request, exc):
    logger.error(f"RequestValidationError occurred: {exc.errors()}")
    try:
        mess = ""
        for err in exc.errors():
            mess = mess + err['msg'] + " \n" 
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=jsonable_encoder({"message": mess}),
        )
    except:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=jsonable_encoder({"detail": exc.errors()}),
        )
