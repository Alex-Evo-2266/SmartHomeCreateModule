import { IAPI } from "./API"
import { IDialog, IPage, IFunction } from "./pageModel"
import { IMenu as WebConstructorMenu } from "alex-evo-web-constructor"


export interface IModuleState{
	name: string
	pages: IPage[]
	api: IAPI[]
	dialog: IDialog[]
	menu: WebConstructorMenu[]
	functions: IFunction[]
}