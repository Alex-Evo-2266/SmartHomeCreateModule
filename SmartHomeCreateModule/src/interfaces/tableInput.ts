import { IOption } from "./componentOption"
import { IColTable, IItemTable } from "./table"
import { TypeComponent } from "./typesComponent"

export interface ITable{
	type: TypeComponent.TABLE
	src: string
	cols: IColTable[]
	title: string
	items?: IItemTable[]
	option?: IOption
}