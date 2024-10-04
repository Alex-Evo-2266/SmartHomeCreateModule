import { IComponents, MoreValueComponent } from "@renderer/entites/module/models/components"
import { AddPageComponentDialog } from "@renderer/features/AddPageComponentDialog/ui/AddPageComponentDialog"
import { BaseDialog, Button, ContentBox, FilledButton, OutlineButton } from "alex-evo-sh-ui-kit"
import { useCallback, useState } from "react"

import { DialogPortal } from "@renderer/shared/ui"
import { EditDialogProps } from "../types"
import { ComponentBox } from "../Components"

interface ConstructorComponentProps<T extends IComponents>{
    component: T, 
    onChange: (data: T)=>void
    editDialog?: React.FC<EditDialogProps<T>>
    onDelete: ()=>void,
}

export const MoreValueComponentTemplate = <T extends MoreValueComponent,>({component, onChange, onDelete, editDialog}:ConstructorComponentProps<T>) => {

    const [addDialogVisible, setAddDialogVisible] = useState<boolean>(false)
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

    const addComponent = useCallback((data: IComponents) => {
        onChange({...component, value:[...component.value, data]})
    },[onChange, component])

    const changeHanler = useCallback((data: IComponents, index: number) => {
        const arrValue = component.value.slice()
        arrValue[index] = data
        onChange({...component, value:arrValue})
    },[onChange, component])

    const deleteItemHandler = useCallback((index:number)=>{
        const arrValue = component.value.filter((_, indexComponent)=>indexComponent !== index)
        onChange({...component, value:arrValue})
    },[onChange, component])

    const EditDialog = editDialog

    return(
        <ContentBox hiding border label={component.type}>
        {editDialog && <OutlineButton className="add-component-button" onClick={clickHandler}>edit</OutlineButton>}    
        {
            component.value.map((item, index)=>(
                <ComponentBox
                    key={index}
                    onChange={(data)=>changeHanler(data, index)} 
                    component={item}
                    onDelete={()=>deleteItemHandler(index)}
                />
            ))
        }
            <Button styleType='filled' className="add-component-button" onClick={()=>setAddDialogVisible(true)}>add</Button>
            <FilledButton 
                style={{backgroundColor:'var(--Error-color)', color: 'var(--On-error-color)'}} 
                className="delete-component-button" 
                onClick={()=>setDeleteDialogVisible(true)}
            >delete</FilledButton>
        {
            addDialogVisible && <AddPageComponentDialog onHide={()=>setAddDialogVisible(false)} onSelect={addComponent}/>
        }
        {
            EditDialog && editDialogVisible && <EditDialog data={component} onHide={()=>setEditDialogVisible(false)} onChange={onChange}/>
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