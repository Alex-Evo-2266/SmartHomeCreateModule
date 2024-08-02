import { TypeComponent } from "@renderer/entites/module/models/types"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"
import { ICard } from "@renderer/entites/module/models/pageModels/pageModel"
import { EditContent, useEditContent } from "./Blocks/EditContent"

export interface EditCardComponentDialogProps{
    data: ICard
    onChange: (newData: ICard)=>void
    onDelete: ()=>void
    onHide:()=>void
    onAddURLClick?:(type: TypeComponent)=>string
}

export const EditCardComponentDialog:React.FC<EditCardComponentDialogProps> = ({data, onDelete, onChange, onHide}) => {

    const [title, setTitle] = useState<string>(data.title || "")
    const [text, setText] = useState<string>(data.text || "")
    const [img, setImg] = useState<string>(data.img || "")
    const [name, setName] = useState<string>(data.name)

    const {changeContent, content} = useEditContent(data)

    const save = useCallback(()=>{
        onChange({...data, ...content, title: title, text: text, img:img, name: name})
        onHide()
    },[data, title, text, img, name, content])

    const del = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Card">
        <FieldContainer header="base">
            <TextField border placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </FieldContainer>
        <EditContent onChange={changeContent} data={content}>
            <TextField border placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <TextField border placeholder="text" value={text} onChange={(e)=>setText(e.target.value)}/>
            <TextField border placeholder="img url" value={img} onChange={(e)=>setImg(e.target.value)}/>
        </EditContent>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}