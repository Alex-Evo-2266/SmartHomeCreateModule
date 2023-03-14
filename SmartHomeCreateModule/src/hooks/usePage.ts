import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IPage, set_module } from "../store/reducers/moduleReducer";
import { useTypeSelector } from "./useTypeSelector";


export const usePage = () => {

    const module = useTypeSelector(state=>state.module)
    const dispatch = useDispatch()

    const getPage = (name: string | undefined) => {
        if (!name) return null
        for (const page of module.pages) {
            if (page.name === name)
            return page
        }
        return null
    }

    const setPage = (name: string | undefined, page:IPage) => {
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
    }

    return {
        getPage,
        setPage
    }
}