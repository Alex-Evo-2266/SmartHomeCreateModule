import { TypeComponent } from "alex-evo-web-constructor"
import { ComponentAction, LayoutComponent } from "./components"

export enum TypeColumn {
	BASE = "BASE",
	JSON = "JSON"
}

export interface IColTable{
	key:string
	label: string
	color?: string
    backgroundColor?: string
	typeCol?: TypeColumn
}

export type IRow = {
	[key:string]:string
}

export interface ITable extends ComponentAction, LayoutComponent{
	type: TypeComponent.TABLE
	title?: string
	cols: IColTable[]
	row: IRow[]
}