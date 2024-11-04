import {IAPI} from '../schemas/models/API'

const IMPORT_API = 'from fastapi import APIRouter'
const ROUTER_INIT = `router = APIRouter(
	prefix="",
	responses={404: {"description": "Not found"}},
)`
const ROUTER_HEAD = ``

export const generateAPI = (api: IAPI) => {
	return `
${IMPORT_API}
${ROUTER_INIT}
${ROUTER_HEAD}
		
@router.get("/${api.url}")
async def ${api.name}():
	return "ok"
`
}