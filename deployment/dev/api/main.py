from fastapi import FastAPI #import class FastAPI()
from app.routers import default, tracking, user

app = FastAPI() # call constructor

app.include_router(default.router)
app.include_router(tracking.router)
app.include_router(user.router)
