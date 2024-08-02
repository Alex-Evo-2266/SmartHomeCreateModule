import { TypeComponent } from "@renderer/entites/module/models/types"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"
import { ICardControl } from "@renderer/entites/module/models/pageModels/pageModel"
import { EditContent, useEditContent } from "./Blocks/EditContent"
import { EditControl, useEditControl } from "./Blocks/EditControl"

export interface EditCardComponentDialogProps{
    data: ICardControl
    onChange: (newData: ICardControl)=>void
    onDelete: ()=>void
    onHide:()=>void
    onAddURLClick?:(type: TypeComponent)=>string
}

export const EditCardControlComponentDialog:React.FC<EditCardComponentDialogProps> = ({data, onDelete, onChange, onHide}) => {

    const [title, setTitle] = useState<string>(data.title || "")
    const [text, setText] = useState<string>(data.text || "")
    const [img, setImg] = useState<string>(data.img || "")
    const [name, setName] = useState<string>(data.name)

    const {changeContent, content} = useEditContent(data)
    const {changeControl, control} = useEditControl(data)

    const save = useCallback(()=>{
        onChange({
            ...data, 
            ...content,
            ...control,
            title, 
            text, 
            img, 
            name, 
        })
        onHide()
    },[onChange, data, title, text, img, content, control, name])

    const deleteComponent = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Card control">
        <FieldContainer header="base">
            <TextField border placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </FieldContainer>
        <EditContent onChange={changeContent} data={content}>
            <TextField border placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <TextField border placeholder="text" value={text} onChange={(e)=>setText(e.target.value)}/>
            <TextField border placeholder="img url" value={img} onChange={(e)=>setImg(e.target.value)}/>
        </EditContent>
        <EditControl data={control} onChange={changeControl}/>
        <BaseActionCard><Button onClick={deleteComponent} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}