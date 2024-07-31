import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { IComponents } from "../../models/pageModels/pageModel"
import { useCallback } from "react"
import { setComponent } from "../reducers/componentReducer"



export const useComponent = () => {

    const dispatch = useAppDispatch()
    const {component} = useAppSelector(state=>state.component)

    const addComponent = useCallback((data: IComponents) => {
        dispatch(setComponent(data))
    },[])

    const getComponent = useCallback(() => {
        let data = component
        dispatch(setComponent(undefined))
        return data
    },[component])

    const componentIsSelected = useCallback(() => {
        return (component)?true:false
    },[component])

    return{
        getComponent,
        addComponent,
        componentIsSelected
    }
}