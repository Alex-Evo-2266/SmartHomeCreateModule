import { IComponents, OneValueComponent } from "@renderer/entites/module/models/components"
import { AddPageComponentDialog } from "@renderer/features/AddPageComponentDialog/ui/AddPageComponentDialog"
import { BaseDialog, Button, ContentBox, FilledButton, OutlineButton } from "alex-evo-sh-ui-kit"
import { useCallback, useState } from "react"
import { ComponentBox } from "../Components"

import { DialogPortal } from "@renderer/shared/ui"
import { EditDialogProps } from "../types"

interface ConstructorComponentProps<T extends IComponents>{
    component: T, 
    onChange: (data: T)=>void
    editDialog?: React.FC<EditDialogProps<T>>
    onDelete: ()=>void,
}

export const OneValueComponentTemplate = <T extends OneValueComponent,>({component, onChange, onDelete, editDialog}:ConstructorComponentProps<T>) => {

    const [addDialogVisible, setAddDialogVisible] = useState<boolean>(false)
    const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false)
    const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false)

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement
        if(!element.closest('.action-block'))
            editDialog && setEditDialogVisible(true)
    }

    const changeHanler = useCallback((data: IComponents) => {
        onChange({...component, value:data})
    },[onChange, component])

    const deleteHandler = useCallback(() => {
        onDelete && onDelete()
    },[onDelete])

    const deleteItemHandler = useCallback(()=>{
        onChange({...component, value:undefined})
    },[onChange, component])

    const EditDialog = editDialog

    return(
        <ContentBox hiding border label={component.type}>
        {editDialog && <OutlineButton className="add-component-button" onClick={clickHandler}>edit</OutlineButton>}    
        {
            component.value?
            <ComponentBox
                onChange={changeHanler} 
                component={component.value}
                onDelete={deleteItemHandler}
            />:
            <Button styleType='filled' className="add-component-button" onClick={()=>setAddDialogVisible(true)}>add</Button>
        }
            <FilledButton 
                style={{backgroundColor:'var(--Error-color)', color: 'var(--On-error-color)'}} 
                className="delete-component-button" 
                onClick={()=>setDeleteDialogVisible(true)}
            >delete</FilledButton>
        {
            addDialogVisible && <AddPageComponentDialog onHide={()=>setAddDialogVisible(false)} onSelect={changeHanler}/>
        }
        {
            editDialogVisible && EditDialog && <EditDialog data={component} onHide={()=>setEditDialogVisible(false)} onChange={onChange}/>
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
        </ContentBox>
    )
}