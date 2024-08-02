import {TypeComponent} from '../types'
import {IOption} from '../optionComponents'
import { ITable } from './table'

export enum TypeContent {
	MANUAL = "MANUAL",
	LOAD = "LOAD"
}

export enum ActionType {
	GET_REQUEST = "GET_REQUEST",
	DIALOG = "DIALOG",
	NONE = "NONE",
	MENU = "MENU",
}

export enum ControlItemType {
	ENUM = "ENUM",
	SWITCH = "SWITCH",
	SEND_TEXT = "SEND_TEXT",
	TEXT = "TEXT",
	RANGE = "RANGE"
}

//----------------base interface----------------

interface BaseComponent
{
	type: TypeComponent
	title: string
	name: string
	option?: IOption
}

export interface BaseAction{
	action_type: ActionType
	action_target?: string
}

export interface BaseContent{
	content_type: TypeContent
	content_target?: string
}

export interface ComponentAction extends BaseComponent, BaseAction {}

export interface ComponentContent extends BaseComponent, BaseContent {}

//----------------base interface----------------

//----------------card interface----------------

interface ICardTemplate extends ComponentContent, BaseAction
{
	type: TypeComponent.CARD | TypeComponent.CARD_CONTROL
	text?: string
	img?: string
}

export interface ICard extends ICardTemplate{
	type: TypeComponent.CARD
}

//----------------card interface----------------

//----------------card control interface----------------

export interface ControlItem 
{
	control_item_type: ControlItemType
	name: string
}

export interface BaseControl{
	control_target: string 
	control: ControlItem[]
}

export interface ICardControl extends ICardTemplate, BaseControl
{
	type: TypeComponent.CARD_CONTROL
}
	

//----------------card control interface----------------

//----------------text interface----------------

export interface ITextField extends ComponentContent
{
	type: TypeComponent.TEXT
}

//----------------text interface----------------

//----------------button interface----------------

export interface IButton extends ComponentAction{
	type: TypeComponent.BUTTON
	link?: boolean
}

//----------------button interface----------------

//----------------columns interface----------------

export interface IColumnElement{
	indexCol: number
	value: IComponents
}

export interface IColumns extends BaseComponent{
	type: TypeComponent.COLUMNS
	value: IColumnElement[]
	count: number
}

//----------------columns interface----------------


export type IComponents = ITextField | ITable | ICard | IButton | IColumns | ICardControl

export interface IPage{
	page: IComponents[]
	url: string
	name: string
} 