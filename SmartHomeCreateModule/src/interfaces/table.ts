
export enum TypeColumn {
	BASE = "",
	ICON = "icon",
	BUTTON = "btn",
	BUTTON_ICON = "btn-icon",
}

export interface IColTable {
	title: string
	name: string
	type?: TypeColumn
	action_url?: string
}

export type colTable = string | IColTable

export interface ICelData {
	title?: string
	color?: string
	onClick?: (value:any)=>void
}

export type celData = string | ICelData

export interface IDataItem{
	[index: string]:celData
}

export interface IItemTable {
	data: IDataItem
	onClick?: (row:any)=>void
	action?: boolean
}