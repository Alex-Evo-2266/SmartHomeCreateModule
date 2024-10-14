import { BaseActionCard, BasicTemplateDialog, Button, FilledButton, TextField } from 'alex-evo-sh-ui-kit'
import React, { useCallback, useState } from "react"
import { IMenu } from 'alex-evo-web-constructor'
import { DialogPortal } from '@renderer/shared/ui'

interface AddMenuDialogProps{
    onCreate:(data:IMenu)=>void
    onHide:()=>void
}

interface AddPageDialogActionProps{
    onSave:()=>void
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

export const AddMenuDialog = ({onCreate, onHide}:AddMenuDialogProps) => {

    const [name, setName] = useState<string>("")

    const nameHeandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    },[])

    const save = useCallback(()=>{
        onCreate({
            name,
            components: []
        })
    },[onCreate, name])

    return(
        <DialogPortal>
            <BasicTemplateDialog header="Add dialog" onHide={onHide} action={<ButtonsAction onHide={onHide} onSave={save}/>}>
                <div className="add-page-dialog-container">
                    <TextField placeholder="name" border value={name} onChange={nameHeandler}/>
                </div>
            </BasicTemplateDialog>
        </DialogPortal>
        
    )
}
