import { IColumns } from "@renderer/entites/module/models/pageModels/pageModel"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"

export interface EditColumnComponentDialogProps{
    data: IColumns
    onChange: (newData: IColumns)=>void
    onDelete: ()=>void
    onHide:()=>void
}


export const EditColumnComponentDialog:React.FC<EditColumnComponentDialogProps> = ({data, onChange, onDelete, onHide}) => {

    const [count, setСount] = useState<number>(data.count)
    const [name, setName] = useState<string>(data.name)

    const save = useCallback(()=>{
        onChange({...data, count:count, name: name})
        onHide()
    },[data, count, name])

    const del = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Column">
        <FieldContainer header="base">
            <TextField border placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </FieldContainer>
        <FieldContainer header="columns">
            <TextField border type="number" min={0} max={50} value={count} name="count" onChange={(e)=>setСount(Number(e.target.value))}/>
        </FieldContainer>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}