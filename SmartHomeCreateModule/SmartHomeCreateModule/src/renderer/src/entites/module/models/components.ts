import { IOption, TypeComponent } from "alex-evo-web-constructor"
import { ITable } from "./table"

export enum TypeSrc{
	MANUAL = 'MANUAL',
	SERVER_GENERATE = "SERVER_GENERATE"
}

export enum ActionType {
	GET_REQUEST = "GET_REQUEST",
	LINK = "LINK",
	DIALOG = "DIALOG",
	NONE = "NONE",
	MENU = "MENU",
	SYSTEM = "SYSTEM"
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
	name?: string
	option?: IOption
}

export interface LayoutComponent extends BaseComponent{
	src_key?: string
    src?: TypeSrc
}

export interface ActionTemplate{
	action_type: ActionType
	action_target?: string
	close_dialog?: boolean
}

export interface ActionTarget extends ActionTemplate{
	action_type: ActionType.DIALOG | ActionType.LINK | ActionType.MENU
	action_target: string
	query?: {
		[key:string]:string
	}
}

export interface ActionFetchTarget extends ActionTemplate{
	action_type: ActionType.GET_REQUEST
	action_target: string
	query?: {
		[key:string]:string
	}
}

export interface ActionSystemTarget extends ActionTemplate{
	action_type: ActionType.SYSTEM
	action_target: string
	arg?: ({
		[key:string]:string
	} | string)[]
}

export interface ActionNoTarget extends ActionTemplate{
	action_type: ActionType.NONE
}

export type BaseAction = ActionTarget | ActionNoTarget | ActionFetchTarget | ActionSystemTarget

//----------------content----------------

//----------------content----------------

export interface ComponentAction extends BaseComponent {
	action: BaseAction
}

export interface ComponentContent extends BaseComponent {}

//----------------base interface----------------

//----------------card interface----------------

interface ICardTemplate extends ComponentContent
{
	type: TypeComponent.CARD
	action: BaseAction
	img?: string
	label: string
	value?: IComponents
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

//----------------card control interface----------------

//----------------text interface----------------

export interface ITextField extends ComponentContent
{
	type: TypeComponent.TEXT
	value: string
}

//----------------text interface----------------

//----------------button interface----------------

export interface IButton extends ComponentAction{
	type: TypeComponent.BUTTON
	label: string
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

export interface IList extends LayoutComponent {
	type: TypeComponent.LIST,
	value: IComponents[]
}

export interface IKeyValue extends BaseComponent {
	type: TypeComponent.KEY_VALUE,
	label: string
	value?: IComponents
}

export interface IDivider extends BaseComponent {
	type: TypeComponent.DIVIDER,
	label?: string
}

export interface IFlexContainer extends LayoutComponent {
	type: TypeComponent.FLEX_CONTAINER,
	value: IComponents[]
}

export interface IGridLayout extends LayoutComponent{
	type: TypeComponent.GRID_LAYOUT,
	value: IComponents[]
}

export interface IPanel extends BaseComponent{
	type: TypeComponent.PANEL,
	value?: IComponents
}

export interface FetchComponent extends ComponentAction{
	action: ActionFetchTarget
}

export interface ISlider extends FetchComponent{
	type: TypeComponent.SLIDER,
	value: number,
	min?: number,
	max?: number,
	step?: number
}

export interface ISelect extends FetchComponent{
	type: TypeComponent.SELECT,
	value: string,
	items: (string | {label:string, data:string})[]
}

export interface ISwitch extends FetchComponent{
	type: TypeComponent.SWITCH,
	value: boolean
}

export interface ISendText extends FetchComponent{
	type: TypeComponent.SEND_TEXT,
	value?: string
}

export type OneValueComponent = IPanel | IKeyValue | ICard
export type MoreValueComponent = IFlexContainer | IGridLayout | IList

export type IComponents = OneValueComponent | MoreValueComponent | ITextField | IButton | IColumns | IDivider | ISlider | ISelect | ISwitch | ISendText | ITable

export interface IPage{
	page: IComponents[]
	url: string
	name: string
} 