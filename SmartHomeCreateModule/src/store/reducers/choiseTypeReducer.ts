import { TypeComponent } from "../../interfaces/typesComponent"

export enum SearchTypesActions {
	SET_TYPE = "SET_TYPE"
}

export interface IState{
	type: TypeComponent | null
}

interface IAction {
	type: SearchTypesActions
	payload:IState
}

const initialSate:IState = {
	type: null
}

export const searchTypeReducer = (state:IState = initialSate, action:IAction):IState => {
	switch (action.type){
		case SearchTypesActions.SET_TYPE:
			return {...state, type: action.payload.type || null}
		default:
			return state
	}
}

export const set_type = (payload:IState) => ({type:SearchTypesActions.SET_TYPE, payload})