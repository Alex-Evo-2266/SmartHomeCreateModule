import { IAPI } from "./APIModels/API"
import { IPage } from "./pageModel"

export interface IModuleState{
	name: string
	pages: IPage[]
	api: IAPI[]
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