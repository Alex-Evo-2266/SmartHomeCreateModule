import { IComponents } from "@renderer/entites/module/models/pageModel"
import { TypeComponent } from "@renderer/entites/module/models/typeComponents"
import { useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { useCallback, useState } from "react"
import { Column } from "./Column/Column"
import { Text } from "./Text/Text"
import './Component.scss'
import { EditComponentDialog } from "@renderer/features/EditComponentDialog"
import { CardComponent } from "./Card/Card"
import { ButtonComponent } from "./Button/Button"
import { DialogPortal } from "@renderer/shared/ui"



export interface PageComponentProp{
    data: IComponents
    onEdit: (index:number, newData:IComponents)=>void
    index:number
    onDelete: (index:number)=>void
}

export const PageComponent: React.FC<PageComponentProp> = ({data, onEdit, index, onDelete}) => {

    const {mode} = useAppSelector(state=>state.editPageMode)
    const [editDialogVisible, setEditDialogVisible] = useState(false)


    const edit = useCallback((newData:IComponents) => {
        onEdit(index, newData)
    },[onEdit, index])

    const showEditDialog = useCallback(()=>{
        setEditDialogVisible(true)
    },[])

    const editComponent = useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
        if(!mode)
            return
        const target = e.target as HTMLDivElement
        if(target.closest(".component-container-plane") == e.currentTarget)
            showEditDialog()
    },[mode, showEditDialog])

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
            (data.type === TypeComponent.CARD)?
            <CardComponent data={data} onClick={showEditDialog}/>:
            (data.type === TypeComponent.BUTTON)?
            <ButtonComponent data={data}/>:
            JSON.stringify(data)
        }
        {
            (editDialogVisible)?
            <DialogPortal>
                <EditComponentDialog onHide={()=>setEditDialogVisible(false)} onDelete={()=>onDelete(index)} data={data} onChange={(data)=>onEdit(index, data)}/>
            </DialogPortal>:
            null
        }
        </div>
    )
}