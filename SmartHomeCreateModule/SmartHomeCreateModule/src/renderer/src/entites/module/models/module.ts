import { IAPI } from "./APIModels/API"
import { IPage } from "./pageModels/pageModel"



export interface IModuleState{
	name: string
	pages: IPage[]
	api: IAPI[]
}