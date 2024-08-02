import { ITextField } from "@renderer/entites/module/models/pageModels/pageModel"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"
import { EditContent, useEditContent } from "./Blocks/EditContent"

export interface EditTextComponentDialogProps{
    data: ITextField
    onChange: (newData: ITextField)=>void
    onDelete: ()=>void
    onHide:()=>void
}

export const EditTextComponentDialog:React.FC<EditTextComponentDialogProps> = ({data, onDelete, onChange, onHide}) => {

    const [text, setText] = useState<string>(data.title)
    const [name, setName] = useState<string>(data.name)

    const {changeContent, content} = useEditContent(data)

    const save = useCallback(()=>{
        onChange({...data, ...content, title:text, name: name})
        onHide()
    },[data, text, name, content])

    const del = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Text">
        <FieldContainer header="base">
            <TextField border placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </FieldContainer>
        <EditContent onChange={changeContent} data={content}>
            <TextField border placeholder="text" value={text} onChange={(e)=>setText(e.target.value)}/>
        </EditContent>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}