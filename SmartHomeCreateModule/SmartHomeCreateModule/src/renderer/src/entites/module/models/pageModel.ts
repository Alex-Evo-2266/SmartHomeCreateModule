import { IComponents as Comp } from "alex-evo-web-constructor"

export enum TypeSrc{
	BASE = 'BASE',
	LOAD = "LOAD"
}

export interface SrcBase{
	typeSrc: TypeSrc.BASE
} 

export interface SrcLoad{
	typeSrc: TypeSrc.LOAD
} 

export type Src = SrcBase | SrcLoad

export type IComponents = Comp & {
	src?: Src
}

export interface IPage{
	page: IComponents | undefined
	url: string
	name: string
} 