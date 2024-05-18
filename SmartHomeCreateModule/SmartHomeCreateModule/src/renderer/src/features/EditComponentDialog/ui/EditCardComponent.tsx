import { ICard, TypeContent} from "@renderer/entites/module/models/pageComponents"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, SigmentedButton, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"

export interface EditCardComponentDialogProps{
    data: ICard
    onChange: (newData: ICard)=>void
    onDelete: ()=>void
    onHide:()=>void
}

export const EditCardComponentDialog:React.FC<EditCardComponentDialogProps> = ({data, onDelete, onChange, onHide}) => {

    const [typeContent, setType_content] = useState<TypeContent>(data.type_content)
    const [title, setTitle] = useState<string>(data.title || "")
    const [text, setText] = useState<string>(data.text || "")
    const [url, setUrl] = useState<string>(data.src || "")
    const [img, setImg] = useState<string>(data.img || "")

    const save = useCallback(()=>{
        onChange({...data, title: title, src:url, text: text, img:img})
        onHide()
    },[data, title, url, text, img])

    const del = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete])

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Card">
        <FieldContainer header="content">
            <SigmentedButton value={typeContent} onChange={(value)=>setType_content(value[0] as TypeContent)} items={Object.values(TypeContent)}/>
            {
                (typeContent === TypeContent.LOAD)?
                <>
                    <TextField border placeholder="src content" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                    <TextField border placeholder="img url" value={img} onChange={(e)=>setImg(e.target.value)}/>
                </>:
                <>
                    <TextField border placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <TextField border placeholder="text" value={text} onChange={(e)=>setText(e.target.value)}/>
                    <TextField border placeholder="img url" value={img} onChange={(e)=>setImg(e.target.value)}/>
                </>
            }
        </FieldContainer>
        <BaseActionCard><Button onClick={del} style={{background:"var(--Error-color)", color:"var(--On-error-color)"}}>delete</Button></BaseActionCard>
    </FullScrinTemplateDialog>
    )
}