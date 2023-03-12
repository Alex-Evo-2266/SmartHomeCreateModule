export enum DialogType {
	ALERT = "ALERT",
	TEXT = "TEXT",
	CONFIRMATION = "CONFIRMATION",
	CASTOM = "CASTOM"
}

export enum DialogTypeAction {
	DIALOG_SHOW = "DIALOG_SHOW",
	DIALOG_HIDE = "DIALOG_HIDE"
}

export interface IDialogData{
	type: DialogType
	title: string
	text?: string
	callback?: (data: any)=>void
	cancel?: ()=>void
	items?: any[]
	html?: React.ReactNode
}

interface IItem{
	title: string
	data: any
}

interface IDialogState{
	type: DialogType
	title: string
	text?: string
	callback?: (data: any)=>void
	cancel?: ()=>void
	items?: IItem[]
	visible: boolean
	html?: React.ReactNode
}

interface IAction {
	type: DialogTypeAction
	payload?:IDialogData
}

const initialSate:IDialogState = {
	type: DialogType.ALERT,
	title: "",
	visible: false,
	text: ""
}

export const dialogReducer = (state:IDialogState = initialSate, action:IAction):IDialogState => {
	switch (action.type){
		case DialogTypeAction.DIALOG_SHOW:
			return {...state, ...action.payload, visible: true}
		case DialogTypeAction.DIALOG_HIDE:
			return {...state, visible: false}
		default:
			return state
	}
}

export const showDialog = (payload: IDialogData) => ({type: DialogTypeAction.DIALOG_SHOW, payload})
export const hideDialog = () => ({type: DialogTypeAction.DIALOG_HIDE})