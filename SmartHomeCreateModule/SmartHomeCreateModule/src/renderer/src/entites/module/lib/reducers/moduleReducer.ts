import { IAPI } from "../../models/APIModels/API"
import { IModuleState } from "../../models/module"
import { IPage } from "../../models/pageModel"

const LOCAL_STORAGE_KEY = "create-module-state"

export enum ModuleActionType{
    SET_NAME = "SET_NAME",
    SET_PAGE = "SET_PAGE",
    SET_API = "SET_API",
    SAVE_MODULE = "SAVE_MODULE",
    LOAD_MODULE = "LOAD_MODULE"
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

export interface ModuleSaveAction{
    type: ModuleActionType.SAVE_MODULE
}

export interface ModuleLoadAction{
    type: ModuleActionType.LOAD_MODULE
}

export type ModuleAction = ModuleNameAction | ModulePageAction | ModuleAPIAction | ModuleSaveAction | ModuleLoadAction

const initState: IModuleState = {
    name: "",
    pages: [],
    api: []
}

const _saveModule = (state:IModuleState):IModuleState => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
    return state
}

const _loadModule = (state:IModuleState):IModuleState => {
    const newData = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if(!newData) return state
    return JSON.parse(newData)
}

export const ModuleReducer = (state:IModuleState = initState, action:ModuleAction) => {
    switch (action.type){
        case ModuleActionType.SET_NAME:
            return _saveModule({...state, name: action.payload})
        case ModuleActionType.SET_API:
            return _saveModule({...state, api: action.payload})
        case ModuleActionType.SET_PAGE:
            return _saveModule({...state, pages: action.payload})
        case ModuleActionType.SAVE_MODULE:
            return _saveModule(state)
        case ModuleActionType.LOAD_MODULE:
            return _loadModule(state)
        default:
            return state
    }
}

export default ModuleReducer
export const setNameModule = (payload: string):ModuleNameAction => ({type:ModuleActionType.SET_NAME, payload})
export const setPageModule = (payload: IPage[]):ModulePageAction => ({type:ModuleActionType.SET_PAGE, payload})
export const setAPIModule = (payload: IAPI[]):ModuleAPIAction => ({type:ModuleActionType.SET_API, payload})
export const saveModule = ():ModuleSaveAction => ({type:ModuleActionType.SAVE_MODULE})
export const loadModule = ():ModuleLoadAction => ({type:ModuleActionType.LOAD_MODULE})
