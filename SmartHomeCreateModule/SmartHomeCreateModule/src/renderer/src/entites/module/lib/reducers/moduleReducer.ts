import { IAPI } from "../../models/APIModels/API"
import { IModuleState } from "../../models/module"
import { IPage } from "../../models/pageModel"

export enum ModuleActionType{
    SET_NAME = "SET_NAME",
    SET_PAGE = "SET_PAGE",
    SET_API = "SET_API"
}

export interface ModuleNameAction{
    type: ModuleActionType.SET_NAME
    payload: string
}
export interface ModulePageAction{
    type: ModuleActionType.SET_PAGE
    payload: IPage[]
}
export interface ModuleAPIAction{
    type: ModuleActionType.SET_API
    payload: IAPI[]
}

export type ModuleAction = ModuleNameAction | ModulePageAction | ModuleAPIAction

const initState: IModuleState = {
    name: "",
    pages: [],
    api: []
}

export const ModuleReducer = (state:IModuleState = initState, action:ModuleAction) => {
    switch (action.type){
        case ModuleActionType.SET_NAME:
            return {...state, name: action.payload}
        case ModuleActionType.SET_API:
            return {...state, api: action.payload}
        case ModuleActionType.SET_PAGE:
            return {...state, pages: action.payload}
        default:
            return state
    }
}

export default ModuleReducer
export const setNameModule = (payload: string):ModuleNameAction => ({type:ModuleActionType.SET_NAME, payload})
export const setPageModule = (payload: IPage[]):ModulePageAction => ({type:ModuleActionType.SET_PAGE, payload})
export const setAPIModule = (payload: IAPI[]):ModuleAPIAction => ({type:ModuleActionType.SET_API, payload})