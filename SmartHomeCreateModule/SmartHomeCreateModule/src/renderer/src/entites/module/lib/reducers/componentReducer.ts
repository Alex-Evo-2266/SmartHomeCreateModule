import { IComponents } from "../../models/pageModel"

export interface IAddComponentState{
    component: IComponents | undefined
}

export enum ComponentActionType{
    SET_COMPONENT = "SET_COMPONENT"
}

export interface ComponentAction{
    type: ComponentActionType.SET_COMPONENT
    payload: IComponents | undefined
}

const initState: IAddComponentState = {
    component: undefined
}

export const componentReducer = (state:IAddComponentState = initState, action:ComponentAction) => {
    switch (action.type){
        case ComponentActionType.SET_COMPONENT:
            return {...state, component: action.payload}
        default:
            return state
    }
}

export default componentReducer
export const setComponent = (payload: IComponents | undefined):ComponentAction => ({type:ComponentActionType.SET_COMPONENT, payload})