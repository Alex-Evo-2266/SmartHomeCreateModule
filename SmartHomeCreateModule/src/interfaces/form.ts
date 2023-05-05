import { IOption } from "./componentOption"
import { TypeComponent } from "./typesComponent"

export interface IForm{
	type: TypeComponent.FORM
	title: string
	option?: IOption
}