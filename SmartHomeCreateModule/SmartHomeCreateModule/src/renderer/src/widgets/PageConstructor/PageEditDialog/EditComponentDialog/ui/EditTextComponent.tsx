import { ITextField, TypeContent } from "@renderer/entites/module/models/pageModels/pageModel"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, SigmentedButton, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"

export interface EditTextComponentDialogProps{
    data: ITextField
    onChange: (newData: ITextField)=>void
    onDelete: ()=>void
    onHide:()=>void
}

export const EditTextComponentDialog:React.FC<EditTextComponentDialogProps> = ({data, onDelete, onChange, onHide}) => {

    const [typeContent, setType_content] = useState<TypeContent>(data.content_type)
    const [url, setUrl] = useState<string>(data.content_target || "")
    const [value, setValue] = useState<string>(data.title)
    const [name, setName] = useState<string>(data.name)

    const save = useCallback(()=>{
        onChange({...data, content_type: typeContent, content_target:url, title:value, name: name})
        onHide()
    },[data, typeContent, url, value, name])

    const del = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Text">
        <FieldContainer header="base">
            <TextField border placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </FieldContainer>
        <FieldContainer header="content">
            <SigmentedButton value={typeContent} onChange={(value)=>setType_content(value[0] as TypeContent)} items={Object.values(TypeContent)}/>
            {
                (typeContent === TypeContent.LOAD)?
                <>
                    <TextField border placeholder="url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </>:
                <>
                    <TextField border placeholder="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
                </>
            }
        </FieldContainer>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}