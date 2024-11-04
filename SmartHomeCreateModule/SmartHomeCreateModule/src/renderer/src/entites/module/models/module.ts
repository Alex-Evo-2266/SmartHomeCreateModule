import { IAPI } from "./API"
import { IDialog, IPage, IFunction } from "./pageModel"
import { IMenu as WebConstructorMenu } from "alex-evo-web-constructor"


export interface IModuleState{
	name: string
	pages: IPage[]
	api: IAPI[]
	functions: IFunction[]
	dialog: IDialog[]
	menu: WebConstructorMenu[]
}

export interface ComponentItem<T> {
    title: string
    icon: React.ReactNode
    data: T
}

export enum CountComponent{
	ONE = "ONE",
	MORE = "MORE",
	COUNT = "COUNT",
	TABLE = "TABLE",
	NONE = "NONE",
	COLUMN = "COLUMN"
}