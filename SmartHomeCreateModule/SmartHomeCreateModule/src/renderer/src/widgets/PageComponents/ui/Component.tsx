import { IComponents } from "@renderer/entites/module/models/pageModel"
import { TypeComponent } from "@renderer/entites/module/models/typeComponents"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { showFullScreenDialog } from "@renderer/shared/lib/reducers/dialogReducer"
import { useCallback } from "react"
import { Column } from "./Column/Column"
import { Text } from "./Text/Text"
import './Component.scss'
import { EditComponentDialog } from "@renderer/features/EditComponentDialog"



export interface PageComponentProp{
    data: IComponents
    onEdit: (index:number, newData:IComponents)=>void
    index:number
    onDelete: (index:number)=>void
}

export const PageComponent: React.FC<PageComponentProp> = ({data, onEdit, index, onDelete}) => {

    const {mode} = useAppSelector(state=>state.editPageMode)
    const dispatch = useAppDispatch()


    const edit = useCallback((newData:IComponents) => {
        onEdit(index, newData)
    },[onEdit, index])

    const editComponent = useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
        if(!mode)
            return
        const target = e.target as HTMLDivElement
        if(target.closest(".component-container-plane") == e.currentTarget)
        {
            dispatch(showFullScreenDialog(<EditComponentDialog onDelete={()=>onDelete(index)} data={data} onChange={(data)=>onEdit(index, data)}/>))
        }
    },[mode, data, index, onDelete])

    return(
        <div className="component-container">
        {
            (mode)?
            <div className='component-container-plane' onClick={editComponent}></div>:
            null
        }
        {
            (data.type === TypeComponent.TEXT)?
            <Text data={data}/>:
            (data.type === TypeComponent.COLUMNS)?
            <Column data={data} onEdit={edit}/>:
            JSON.stringify(data)
        }
        </div>
    )
}