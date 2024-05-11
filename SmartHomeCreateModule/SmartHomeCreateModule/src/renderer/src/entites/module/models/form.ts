import { IOption } from "./optionComponents"
import { TypeComponent } from "./typeComponents"

export interface IForm{
	type: TypeComponent.FORM
	title: string
	option?: IOption
}