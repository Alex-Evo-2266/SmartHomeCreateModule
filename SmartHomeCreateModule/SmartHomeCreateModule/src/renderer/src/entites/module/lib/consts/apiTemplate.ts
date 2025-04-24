
export function get_api_template(url:string){
    return `
from fastapi import APIRouter
router = APIRouter(
	prefix="",
	responses={404: {"description": "Not found"}},
)
		
@router.get("/${url}")
async def link():
	return "ok"
`
}