import { TypeAPI, TypeComponent } from "@renderer/entites/module/models/types"
import { BaseActionCard, Button, FieldContainer, FullScrinTemplateDialog, SigmentedButton, TextField } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"
import { SelectURL } from "@renderer/features/UrlDialogs"
import { ICardControl, TypeContent } from "@renderer/entites/module/models/pageModels/pageModel"

export interface EditCardComponentDialogProps{
    data: ICardControl
    onChange: (newData: ICardControl)=>void
    onDelete: ()=>void
    onHide:()=>void
    onAddURLClick?:(type: TypeComponent)=>string
}

export const EditCardControlComponentDialog:React.FC<EditCardComponentDialogProps> = ({data, onDelete, onChange, onHide}) => {

    const [typeContent, setType_content] = useState<TypeContent>(data.content_type)
    const [title, setTitle] = useState<string>(data.title || "")
    const [text, setText] = useState<string>(data.text || "")
    const [img, setImg] = useState<string>(data.img || "")
    const [name, setName] = useState<string>(data.name)
    const [target, setTarget] = useState<string>(data.content_target || "")

    const save = useCallback(()=>{
        onChange({...data, title: title, text: text, img:img, content_type:typeContent, name: name, content_target:target})
        onHide()
    },[data, title, text, img, typeContent, name, target])

    const del = useCallback(() => {
        onHide()
        onDelete()
    },[onDelete])

    const urlHandler = (value: string) => {
        setTarget(value)
    }

    return(
    <FullScrinTemplateDialog onSave={save} onHide={()=>onHide()} header="Edit Card control">
        <FieldContainer header="base">
            <TextField border placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </FieldContainer>
        <FieldContainer header="content">
            <SigmentedButton value={typeContent} onChange={(value)=>setType_content(value[0] as TypeContent)} items={Object.values(TypeContent)}/>
            {
                (typeContent === TypeContent.LOAD)?
                <>
                    <SelectURL typeAPI={TypeAPI.CARD_CONTROL} border placeholder="src content" value={target} onChange={urlHandler}/>
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