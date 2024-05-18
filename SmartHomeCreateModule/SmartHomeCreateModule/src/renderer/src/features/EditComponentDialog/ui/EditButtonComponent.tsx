import { IButton} from "@renderer/entites/module/models/pageComponents"
import { useAppDispatch } from "@renderer/shared/lib/hooks/redux"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, TextField } from "alex-evo-sh-ui-kit"
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
    const [url, setUrl] = useState<string>(data.action_url)

    const save = useCallback(()=>{
        onChange({...data, title: title, action_url:url})
        onHide()
    },[data, title, url])

    const del = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete, dispath])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Text">
        <FieldContainer header="content">
            <TextField border placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <TextField border placeholder="url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
        </FieldContainer>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}