import { IModuleState } from "../../interfaces/module"

export enum ModuleTypesActions {
	SET_MODULE = "SET_MODULE"
}

interface IAction {
	type: ModuleTypesActions
	payload:IModuleState
}

const initialSate:IModuleState = {
	name: "",
	pages: [],
	api: []
}

export const moduleReducer = (state:IModuleState = initialSate, action:IAction):IModuleState => {
	switch (action.type){
		case ModuleTypesActions.SET_MODULE:
			return {...state, name: action.payload.name || "", pages: action.payload.pages, api: action.payload.api}
		default:
			return state
	}
}

export const set_module = (payload:IModuleState) => ({type:ModuleTypesActions.SET_MODULE, payload})