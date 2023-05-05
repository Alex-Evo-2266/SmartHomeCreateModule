import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { set_module } from "../store/reducers/moduleReducer";
import { useTypeSelector } from "./useTypeSelector";
import { IPage } from "../interfaces/page";


export const usePage = () => {

    const module = useTypeSelector(state=>state.module)
    const dispatch = useDispatch()

    const getPage = useCallback((name: string | undefined) => {
        if (!name) return null
        for (const page of module.pages) {
            if (page.name === name)
            return page
        }
        return null
    },[module])

    const setPage = useCallback((name: string | undefined, page:IPage) => {
        if (!name) return false
        let newDate = module.pages
        newDate = newDate.map(item=>{
            if(item.name === name)
                return page
            else
                return item
        })
        dispatch(set_module({...module, pages:newDate}))
        return true
    },[module])

    return {
        getPage,
        setPage
    }
}