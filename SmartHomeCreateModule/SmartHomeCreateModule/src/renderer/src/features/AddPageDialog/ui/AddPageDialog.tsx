import { useURL } from "@renderer/entites/Url"
import { IPage } from "@renderer/entites/module/models/pageModel"
import { BaseActionCard, BasicTemplateDialog, Button, FilledButton, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from "react"
import './AddPageDialog.scss'

interface AddPageDialogProps{
    onCreate:(data:IPage)=>void
    onHide:()=>void
}

export const AddPageDialog = ({onCreate, onHide}:AddPageDialogProps) => {

    const [name, setName] = useState<string>("")
    const [url, setUrl] = useState<string>("")
    const [urlFocus, setUrlFocus] = useState<boolean>(false)
    const {getFullPageURL} = useURL()

    const nameHeandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        if (url == name)
            setUrl(event.target.value)
        setName(event.target.value)
    },[name, url])

    const save = useCallback(()=>{
        onCreate({
            name,
            url,
            page: []
        })
    },[onCreate, name, url])

    return(
        <BasicTemplateDialog header="Add page" onHide={onHide} action={<ButtonsAction onHide={onHide} onSave={save}/>}>
            <div className="add-page-dialog-container">
                <TextField placeholder="name" border value={name} onChange={nameHeandler}/>
            </div>
            <div className="add-page-dialog-container">
                <TextField placeholder="url" border onFocus={()=>setUrlFocus(true)} onBlur={()=>setUrlFocus(false)} value={(urlFocus)?url:getFullPageURL(url)} onChange={(e)=>setUrl(e.target.value)}/>
            </div>
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