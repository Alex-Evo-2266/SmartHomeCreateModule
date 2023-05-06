from castom_moduls.test.schemes.testtable import TabletesttableScheme
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from SmartHome.authtorization.auth_depends import token_dep

router = APIRouter(
    prefix="",
    tags=["test"],
    responses={404: {"description": "Not found"}},
)


@router.get("/table_status", response_model=TabletesttableScheme)
async def table_status(auth_data: dict = Depends(token_dep)):
    pass


@router.get("/btn")
async def btn(auth_data: dict = Depends(token_dep)):
    pass

