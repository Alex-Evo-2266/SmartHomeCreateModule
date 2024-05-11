import {IButton, ICard, ICards, IDeviceCard, IImage, ITextField} from './pageComponents'
import {TypeComponent} from './typeComponents'
import {IOption} from './optionComponents'
import {ITable} from './table'
import {IForm} from './form'

export interface IColumnElement{
	indexCol: number
	value: IComponents
}

export interface IColumns{
	type: TypeComponent.COLUMNS
	value: IColumnElement[]
	count: number
	option?: IOption
}

export type IComponents = ITextField | ITable | ICard | IDeviceCard | ICards | IForm | IImage | IButton | IColumns

export interface IPage{
	page: IComponents[]
	url: string
	name: string
}