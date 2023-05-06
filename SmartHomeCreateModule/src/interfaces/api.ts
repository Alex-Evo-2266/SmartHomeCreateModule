export enum TypeRequest {
	GET = "GET",
	POST = "POST"
}

export enum UseElement {
	BUTTON = "BUTTON",
	TABLE_BUTTON = "TABLE_BUTTON",
	TABLE = "TABLE",
	CARDS = "CARDS",
	TEXT = "TEXT"
}

export interface IAPI{
	name: string
	url: string
	use?: UseElement | undefined
	useDitail?: string | object
	type: TypeRequest
}