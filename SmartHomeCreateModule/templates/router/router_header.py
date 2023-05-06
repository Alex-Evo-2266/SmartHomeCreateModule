from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from SmartHome.authtorization.auth_depends import token_dep

router = APIRouter(
    prefix="",
    tags=["%{module.name}%"],
    responses={404: {"description": "Not found"}},
)

