import { IOption } from "./componentOption"
import { IForm } from "./form"
import { IButton, ICard, ICards, IDeviceCard, IImage, ITextField } from "./otherComponents"
import { ITable } from "./tableInput"
import { TypeComponent } from "./typesComponent"

export interface IColumnElement{
	indexCol: number
	value: IType
}

export interface IColumns{
	type: TypeComponent.COLUMNS
	value: IColumnElement[]
	count: number
	option?: IOption
}

export type IType = ITextField | ITable | ICard | IDeviceCard | ICards | IForm | IImage | IButton | IColumns

export interface IPage{
	page: IType[]
	url: string
	name: string
}


