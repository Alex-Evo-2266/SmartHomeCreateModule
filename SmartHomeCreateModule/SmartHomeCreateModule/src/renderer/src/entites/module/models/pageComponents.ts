import { IOption } from "./optionComponents"
import { TypeComponent } from "./typeComponents"

export enum TypeContent {
	TEXT = "TEXT",
	LOAD = "LOAD"
}

export interface ICards{
	type: TypeComponent.CARDS
	src: string
	title: string
	text: string
	buttons: IButton[]
	option?: IOption
}

export interface IDeviceCard{
	type:TypeComponent.DEVICE_CARD
	src: string
	title?: string
	text?: string
	buttons?: IButton[]
	option?: IOption
}

export interface ICardText{
	type: TypeComponent.CARD
	type_content: TypeContent.TEXT
	src?: string
	title: string
	text: string
	buttons?: IButton[]
	img?: string
	option?: IOption
}

export interface ICardLoad{
	type: TypeComponent.CARD
	type_content: TypeContent.LOAD
	src: string
	title?: string
	text?: string
	buttons?: IButton[]
	img?: string
	option?: IOption
}

export type ICard = ICardText | ICardLoad

export interface ITextField{
	type: TypeComponent.TEXT
	type_content: TypeContent
	value: string
	url?: string
	option?: IOption
}

export interface IImage{
	type: TypeComponent.IMAGE
	src: string
	option?: IOption
}

export interface IButton{
	type: TypeComponent.BUTTON | TypeComponent.LINK
	title: string
	action_url: string
	option?: IOption
}