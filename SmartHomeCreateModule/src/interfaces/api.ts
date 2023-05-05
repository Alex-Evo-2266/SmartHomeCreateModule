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
	use?: UseElement | undefined
	useDitail?: string
	type: TypeRequest
}