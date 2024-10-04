import { useURL } from "@renderer/entites/Url"
import { BaseActionCard, BasicTemplateDialog, Button, FilledButton, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from "react"
import { SelectField } from "@renderer/shared/ui"
import { URL_ITEM } from "@renderer/entites/module"
import { TypeAPI } from "@renderer/entites/module/models/types"
import { IAPI, TypeRequest } from "@renderer/entites/module/models/APIModels/API"
import { TypeComponent } from "alex-evo-web-constructor"

interface AddPageDialogProps{
    onChange:(data:IAPI, index?: number)=>void
    onHide:()=>void
    index?: number
    data?: IAPI
    typeComponentFixid?: TypeAPI
}

export const EditAPIDialog = ({onChange, onHide, index, data, typeComponentFixid}:AddPageDialogProps) => {

    const [name, setName] = useState<string>(data?.name ?? "")
    const [url, setUrl] = useState<string>(data?.url ?? "")
    const [typeComponent, setTypeComponent] = useState<TypeAPI | undefined>(data?.use_type ?? typeComponentFixid)
    const [urlFocus, setUrlFocus] = useState<boolean>(false)
    const {getFullURL} = useURL()

    const nameHeandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        if (url == name)
            setUrl(event.target.value)
        setName(event.target.value)
    },[name, url])

    const save = useCallback(()=>{
        onChange({
            name,
            url,
            type: TypeRequest.GET,
            use_type: typeComponent || TypeAPI.UNDEFINED
        }, index)
        onHide()
    },[onChange, onHide, name, url, typeComponent])

    function getSelectItem():{value: TypeComponent | string, title: string}[]{
        const items:{value: TypeAPI | string, title: string}[] = URL_ITEM.map(item=>({value: item.data, title: item.title}))
        return items
    }

    const useHandler = (value:string) => {
        if(value === "")
            setTypeComponent(undefined)
        else
            setTypeComponent(value as TypeAPI)
    }

    return(
        <BasicTemplateDialog header="Add API" onHide={onHide} action={<ButtonsAction onHide={onHide} onSave={save}/>}>
            <div className="add-page-dialog-container">
                <TextField placeholder="name" border value={name} onChange={nameHeandler}/>
            </div>
            <div className="add-page-dialog-container">
                <TextField placeholder="url" border onFocus={()=>setUrlFocus(true)} onBlur={()=>setUrlFocus(false)} value={(urlFocus)?url:getFullURL(url)} onChange={(e)=>setUrl(e.target.value)}/>
            </div>
            {
                (!typeComponentFixid)?
                <div className="add-page-dialog-container">
                    <SelectField border items={getSelectItem()} onChange={useHandler} value={typeComponent}/>
                </div>
                :null
            }
            
        </BasicTemplateDialog>
    )
}

interface AddPageDialogActionProps{
    onSave:()=>void
    onHide:()=>void
}

const ButtonsAction = ({onSave, onHide}:AddPageDialogActionProps) => (
    <BaseActionCard>
        <Button onClick={onHide}>cancel</Button>
        <FilledButton onClick={onSave}>save</FilledButton>
    </BaseActionCard>
)