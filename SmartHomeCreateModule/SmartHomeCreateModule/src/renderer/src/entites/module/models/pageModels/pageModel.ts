import {TypeComponent} from '../types'
import {IOption} from '../optionComponents'
import { ITable } from './table'

export enum TypeContent {
	TEXT = "TEXT",
	LOAD = "LOAD"
}

export enum ActionType {
	GET_REQUEST = "GET_REQUEST",
	DIALOG = "DIALOG",
	NONE = "NONE",
	MENU = "MENU",
}

//----------------base interface----------------

interface BaseComponent
{
	type: TypeComponent
	title: string
	name: string
	option?: IOption
}

interface BaseAction{
	action_type: ActionType
	action_target?: string
}

interface ComponentAction extends BaseComponent, BaseAction {}

interface ComponentContent extends BaseComponent
{
	content_type: TypeContent
	content_target?: string
}

//----------------base interface----------------

//----------------card interface----------------

interface ICardTemplate extends ComponentContent, BaseAction
{
	type: TypeComponent.CARD
	text?: string
	img?: string
}

export type ICard = ICardTemplate

//----------------card interface----------------

//----------------card control interface----------------

export interface ICardControl extends ComponentContent, BaseAction
{
	type: TypeComponent.CARD_CONTROL
	text?: string
	img?: string
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