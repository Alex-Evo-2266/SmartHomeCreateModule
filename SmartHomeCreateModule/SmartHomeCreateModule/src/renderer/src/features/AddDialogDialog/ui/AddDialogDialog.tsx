import { BaseActionCard, BasicTemplateDialog, Button, FilledButton, TextField } from 'alex-evo-sh-ui-kit'
import React, { useCallback, useState } from "react"
import { IDialog } from '../../../entites/module/models/pageModel'

interface AddPageDialogProps{
    onCreate:(data:IDialog)=>void
    onHide:()=>void
}

function ButtonsAction({onSave, onHide}:AddPageDialogActionProps){
    return(
        <BaseActionCard>
            <Button onClick={onHide}>cancel</Button>
            <FilledButton onClick={onSave}>save</FilledButton>
        </BaseActionCard>
    )
}

export const AddDialogDialog = ({onCreate, onHide}:AddPageDialogProps) => {

    const [name, setName] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const nameHeandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    },[])

    const save = useCallback(()=>{
        onCreate({
            name,
            title,
            components: undefined
        })
    },[onCreate, name, title])

    return(
        <BasicTemplateDialog header="Add dialog" onHide={onHide} action={<ButtonsAction onHide={onHide} onSave={save}/>}>
            <div className="add-page-dialog-container">
                <TextField placeholder="name" border value={name} onChange={nameHeandler}/>
            </div>
            <div className="add-page-dialog-container">
                <TextField placeholder="title" border value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
        </BasicTemplateDialog>
    )
}

interface AddPageDialogActionProps{
    onSave:()=>void
    onHide:()=>void
}

