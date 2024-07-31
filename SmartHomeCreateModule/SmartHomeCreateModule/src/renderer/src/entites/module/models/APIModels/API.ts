import { TypeAPI } from "../types"

export enum TypeRequest {
	GET = "GET",
	POST = "POST"
}

export interface IAPI{
	name: string
	url: string
	use_type: TypeAPI
	use_ditail?: string | object
	use_target?: string
	type: TypeRequest

}



 