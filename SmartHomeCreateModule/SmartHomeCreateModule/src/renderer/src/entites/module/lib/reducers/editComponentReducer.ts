
export interface IEditComponent{
    mode: boolean
}

export enum EditModeActionType{
    SET_MODE = "SET_MODE"
}

export interface EditModeAction{
    type: EditModeActionType.SET_MODE
    payload: boolean
}

const initState: IEditComponent = {
    mode: false
}

export const editModeReducer = (state:IEditComponent = initState, action:EditModeAction) => {
    switch (action.type){
        case EditModeActionType.SET_MODE:
            return {...state, mode: action.payload}
        default:
            return state
    }
}

export default editModeReducer
export const setEditMode = (payload: boolean):EditModeAction => ({type:EditModeActionType.SET_MODE, payload})