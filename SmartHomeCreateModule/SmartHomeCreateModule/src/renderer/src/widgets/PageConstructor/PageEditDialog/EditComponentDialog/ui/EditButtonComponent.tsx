import { IButton } from "@renderer/entites/module/models/pageModels/pageModel"
import { useAppDispatch } from "@renderer/shared/lib/hooks/redux"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"
import { EditAction, useEditAction } from "./Blocks/EditAction"

export interface EditButtonComponentDialogProps{
    data: IButton
    onChange: (newData: IButton)=>void
    onDelete: ()=>void
    onHide:()=>void
}

export const EditButtonComponentDialog:React.FC<EditButtonComponentDialogProps> = ({data, onDelete, onChange, onHide}) => {

    const dispath = useAppDispatch()
    const [name, setName] = useState<string>(data.name)
    const [title, setTitle] = useState<string>(data.title)

    const {action, changeAction} = useEditAction(data)

    const save = useCallback(()=>{
        onChange({...data, ...action, title: title, name: name})
        onHide()
    },[data, title, action, name])

    const del = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete, dispath])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Text">
        <FieldContainer header="base">
            <TextField border placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </FieldContainer>
        <FieldContainer header="content">
            <TextField border placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </FieldContainer>
        <EditAction data={action} onChange={changeAction}/>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}