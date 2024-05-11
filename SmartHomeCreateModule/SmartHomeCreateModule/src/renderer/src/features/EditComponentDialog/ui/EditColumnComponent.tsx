import { IColumns } from "@renderer/entites/module/models/pageModel"
import { useAppDispatch } from "@renderer/shared/lib/hooks/redux"
import { hideFullScreenDialog } from "@renderer/shared/lib/reducers/dialogReducer"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"

export interface EditColumnComponentDialogProps{
    data: IColumns
    onChange: (newData: IColumns)=>void
    onDelete: ()=>void
}


export const EditColumnComponentDialog:React.FC<EditColumnComponentDialogProps> = ({data, onChange, onDelete}) => {

    const dispath = useAppDispatch()
    const [count, setСount] = useState<number>(data.count)

    const save = useCallback(()=>{
        onChange({...data, count:count})
        dispath(hideFullScreenDialog())
    },[data, count])

    const del = useCallback(() => {
        dispath(hideFullScreenDialog())
        onDelete()
    },[onDelete, dispath])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>dispath(hideFullScreenDialog())} header="Edit Column">
        <FieldContainer header="columns">
            <TextField border type="number" min={0} max={50} value={count} name="count" onChange={(e)=>setСount(Number(e.target.value))}/>
        </FieldContainer>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}