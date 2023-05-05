import { IAPI } from "./api"
import { IPage } from "./page"



export interface IModuleState{
	name: string
	pages: IPage[]
	api: IAPI[]
}