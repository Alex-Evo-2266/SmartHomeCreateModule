import { setAPIModule } from "@renderer/entites/module/lib/reducers/moduleReducer"
import { TypeAPI } from "@renderer/entites/module/models/types"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { DialogPortal } from "@renderer/shared/ui"
import { SelectField } from "@renderer/shared/ui/Select/Select"
import { useCallback, useState } from "react"
import { EditAPIDialog } from "./EditAPIDialog"
import { IAPI } from "@renderer/entites/module/models/APIModels/API"

export interface ISelectFieldProps{
    onChange?:(value: string)=>void
    value?: string
    placeholder?: string
    className?: string
    border?: boolean
    name?: string
    error?: boolean
    onFocus?: (e:React.FocusEvent<HTMLInputElement>)=>void
    onBlur?: (e:React.FocusEvent<HTMLInputElement>)=>void
    typeAPI?: TypeAPI
}

const ADD_URL = "add url"

export const SelectURL:React.FC<ISelectFieldProps> = (props) => {

    const {api} = useAppSelector(state=>state.module)
    const [editUrlVisible, setEditURLVisible] = useState(false)
    const dispatch = useAppDispatch()

    const getItems = () => {
        let items:string[] = []
        if(props.typeAPI)
            items = api.filter(item=>(item.use_type === props.typeAPI)).map(item=>item.url)
        items.unshift(ADD_URL)
        return items
    }

    const changeHandler = (value:string) => {
        if(value === ADD_URL){
            setEditURLVisible(true)
            return
        }
        let newUrl = api.map(item=>{
            if(item.url === value && item.use_type === props.typeAPI)
                return {...item, use:props.typeAPI}
            return item
        })
        dispatch(setAPIModule(newUrl))
        props.onChange && props.onChange(value)
    }

    const addUrl = useCallback((data:IAPI)=>{
        let apis = api.slice()
        apis.push({...data, use_type: props.typeAPI || TypeAPI.UNDEFINED})
        dispatch(setAPIModule(apis))
        props.onChange && props.onChange(data.url)
        setEditURLVisible(false)
    },[dispatch, props.onChange])

    return(
        <>
        <SelectField {...{...props, items:getItems(), onChange:changeHandler}}/>
        {
            (editUrlVisible)?
            <DialogPortal>
                <EditAPIDialog typeComponentFixid={props.typeAPI} onHide={()=>setEditURLVisible(false)} onChange={addUrl}/>
            </DialogPortal>
            :null
        }
        </>
    )
}