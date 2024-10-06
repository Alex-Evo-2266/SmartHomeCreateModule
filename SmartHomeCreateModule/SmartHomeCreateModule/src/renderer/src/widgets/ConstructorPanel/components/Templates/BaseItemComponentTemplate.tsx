import { IComponents } from "@renderer/entites/module/models/components"
import { BaseDialog, Typography } from "alex-evo-sh-ui-kit"
import { useCallback, useState } from "react"
import { EditDialogProps } from "../types"

import './BaseItemComponentTemplate.scss'
import { Trash2 } from "lucide-react"
import { DialogPortal } from "@renderer/shared/ui"

interface ConstructorComponentProps<T extends IComponents>{
    component: T, 
    onChange: (data: T)=>void
    editDialog?: React.FC<EditDialogProps<T>>
    onDelete?: ()=>void,
}

export const TemplateComponent = <T extends IComponents,>({component, onChange, editDialog, onDelete}:ConstructorComponentProps<T>) => {

    const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false)
    const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false)

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement
        if(!element.closest('.action-block'))
            editDialog && setEditDialogVisible(true)
    }

    const deleteHandler = useCallback(() => {
        onDelete && onDelete()
    },[onDelete])
    
    const changeHandler = useCallback((data: T) => {
        onChange(data)
    },[onChange]) 

    const EditDialog = editDialog

    return(
        <>
        <div className="list-item-component" onClick={clickHandler}>
            <Typography type='title'>{component.type}</Typography>
            <div className="list-item-component-delete action-block" data-el="delete" onClick={()=>setDeleteDialogVisible(true)}>
                <Trash2 color="var(--Error-color)"/>
            </div>
        </div>
        {
            editDialogVisible && EditDialog && <EditDialog data={component} onHide={()=>setEditDialogVisible(false)} onChange={changeHandler}/>
        }
        {
            deleteDialogVisible && <DialogPortal>
                <BaseDialog 
                header="Delete component" 
                text="Are you sure you want to remove the component?" 
                onHide={()=>setDeleteDialogVisible(false)}
                onSuccess={deleteHandler}
                />
            </DialogPortal>
        }
        </>
    )
}
