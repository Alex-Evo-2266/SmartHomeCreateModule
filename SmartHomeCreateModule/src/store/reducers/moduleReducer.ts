export enum ModuleTypesActions {
	SET_MODULE = "SET_MODULE"
}

export enum TypeContent {
	TEXT = "TEXT",
	LOAD = "LOAD"
}

export enum TypeComponent {
	CARD = "CARD",
	DEVICE_CARD = "DEVICE_CARD",
	CARDS = "CARDS",
	TABLE = "TABLE",
	TEXT = "TEXT",
	FORM = "FORM",
	IMAGE = "IMAGE",
	BUTTON = "BUTTON",
	LINK = "LINK",
	COLUMNS = "COLUMNS"
}

export interface IOption{
	borderRadius?: number
	color?: string
	fontSize?: number
	width?: number
	height?: number
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

export interface ICard{
	type: TypeComponent.CARD
	src: string
	title: string
	text: string
	buttons: IButton[]
	option?: IOption
}

export interface ITableCol{
	title: string
	type: string
}

export interface ITable{
	type: TypeComponent.TABLE
	src: string
	col: ITableCol[]
	items: [any]
	option?: IOption
}

export interface ITextField{
	type: TypeComponent.TEXT
	type_content: TypeContent
	value: string
	option?: IOption
}

export interface IForm{
	type: TypeComponent.FORM
	title: string
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

export interface IModuleState{
	name: string
	pages: IPage[]
	api: IAPI[]
}

interface IAction {
	type: ModuleTypesActions
	payload:IModuleState
}

export enum TypeRequest {
	GET = "GET",
	POST = "POST"
}

export enum UseElement {
	BUTTON = "BUTTON",
	TABLE = "TABLE",
	CARDS = "CARDS"
}

export interface IAPI{
	name: string
	url: string
	use?: UseElement
	useDitail?: string
	type: TypeRequest
}

const initialSate:IModuleState = {
	name: "",
	pages: [],
	api: []
}

export const moduleReducer = (state:IModuleState = initialSate, action:IAction):IModuleState => {
	switch (action.type){
		case ModuleTypesActions.SET_MODULE:
			return {...state, name: action.payload.name || "", pages: action.payload.pages, api: action.payload.api}
		default:
			return state
	}
}

export const set_module = (payload:IModuleState) => ({type:ModuleTypesActions.SET_MODULE, payload})