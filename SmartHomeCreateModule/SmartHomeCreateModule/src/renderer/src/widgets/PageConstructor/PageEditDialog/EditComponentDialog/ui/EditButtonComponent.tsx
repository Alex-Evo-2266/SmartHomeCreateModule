import { ActionType, IButton } from "@renderer/entites/module/models/pageModels/pageModel"
import { TypeAPI } from "@renderer/entites/module/models/types"
import { SelectURL } from "@renderer/features/UrlDialogs"
import { useAppDispatch } from "@renderer/shared/lib/hooks/redux"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, SigmentedButton, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"

export interface EditButtonComponentDialogProps{
    data: IButton
    onChange: (newData: IButton)=>void
    onDelete: ()=>void
    onHide:()=>void
}

export const EditButtonComponentDialog:React.FC<EditButtonComponentDialogProps> = ({data, onDelete, onChange, onHide}) => {

    const dispath = useAppDispatch()
    const [title, setTitle] = useState<string>(data.title)
    const [typeAction, setTypeAction] = useState<ActionType>(data.action_type)
    const [url, setUrl] = useState<string>(data.action_target || "")
    const [name, setName] = useState<string>(data.name)

    const save = useCallback(()=>{
        onChange({...data, title: title, action_target:url, name: name})
        onHide()
    },[data, title, url, name])

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
            <SigmentedButton value={typeAction} onChange={(value)=>setTypeAction(value[0] as ActionType)} items={Object.values(ActionType)}/>
            {
                (typeAction === ActionType.GET_REQUEST)?
                <SelectURL typeAPI={TypeAPI.ACTION} border placeholder="src content" value={url} onChange={(value)=>setUrl(value)}/>:
                null
            }
        </FieldContainer>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}