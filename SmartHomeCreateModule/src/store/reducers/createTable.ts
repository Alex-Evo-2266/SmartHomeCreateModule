import { ITable } from "../../interfaces/tableInput"

export enum CreateTablePageTypeAction {
	CREATE_TABLE_PAGE_SHOW = "CREATE_TABLE_PAGE_SHOW",
	CREATE_TABLE_PAGE_HIDE = "CREATE_TABLE_PAGE_HIDE"
}

export interface ITableData{
	table?: ITable
    update: (data:ITable)=>void
	del: ()=>void
}

interface ITableState{
	table?: ITable
    visible: boolean
    update: (data:ITable)=>void
	del: ()=>void
}

interface IAction {
	type: CreateTablePageTypeAction
	payload?:ITableData
}

const initialSate:ITableState = {
	table: undefined,
	visible: false,
	update: (data)=>{},
	del: ()=>{}
}

export const createTableReducer = (state:ITableState = initialSate, action:IAction):ITableState => {
	switch (action.type){
		case CreateTablePageTypeAction.CREATE_TABLE_PAGE_SHOW:
			return {...state, ...action.payload, visible: true}
		case CreateTablePageTypeAction.CREATE_TABLE_PAGE_HIDE:
			return {...state, visible: false}
		default:
			return state
	}
}

type IShowDialog = (payload:(ITableData))=>IAction

export const showCreateTablePage: IShowDialog = (payload: ITableData) => ({type: CreateTablePageTypeAction.CREATE_TABLE_PAGE_SHOW, payload:{...payload}})
export const hideCreateTablePage = () => ({type: CreateTablePageTypeAction.CREATE_TABLE_PAGE_HIDE})