export enum ModuleTypesActions {
	SET_MODULE = "SET_MODULE"
}

interface IPayload{
	name?: string
}

export interface IModuleState{
	name: string
}

interface IAction {
	type: ModuleTypesActions
	payload:IPayload
}

const initialSate:IModuleState = {
	name: ""
}

export const moduleReducer = (state:IModuleState = initialSate, action:IAction):IModuleState => {
	switch (action.type){
		case "SET_MODULE":
			return {...state, name: action.payload.name || ""}
		default:
			return state
	}
}