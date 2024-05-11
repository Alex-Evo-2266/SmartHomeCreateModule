import { IAPI } from "./APIModel"
import { IPage } from "./pageModel"



export interface IModuleState{
	name: string
	pages: IPage[]
	api: IAPI[]
}