import { TypeComponent } from "alex-evo-web-constructor"
import { IComponents } from "./components"

export interface IPage{
	page: IComponents | undefined
	url: string
	name: string
} 

export interface IDialog{
	components: IComponents | undefined
	title: string
	name: string
	query?: {
        [key: string]: string;
    };
} 

export interface IFunction{
    key: string
    type: TypeComponent
    name?: string
	code: string
}