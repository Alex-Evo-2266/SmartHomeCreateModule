import { BaseActionCard, BasicTemplateDialog, Button, FilledButton, TextField } from 'alex-evo-sh-ui-kit'
import React, { useCallback, useState } from "react"
import { DialogPortal } from '@renderer/shared/ui'
import { IDevice } from '@renderer/entites/module/models/device'

interface AddPageDialogProps{
    onCreate:(data:IDevice)=>void
    onHide:()=>void
}

function ButtonsAction({onSave, onHide}:AddPageDeviceActionProps){
    return(
        <BaseActionCard>
            <Button onClick={onHide}>cancel</Button>
            <FilledButton onClick={onSave}>save</FilledButton>
        </BaseActionCard>
    )
}

export const AddDeviceDialog = ({onCreate, onHide}:AddPageDialogProps) => {

    const [name, setName] = useState<string>("")

    const nameHeandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    },[])

    const save = useCallback(()=>{
        onCreate({
            name,
        })
    },[onCreate, name])

    return(
        <DialogPortal>
            <BasicTemplateDialog header="Add device" onHide={onHide} action={<ButtonsAction onHide={onHide} onSave={save}/>}>
                <div className="add-device-dialog-container">
                    <TextField placeholder="name" border value={name} onChange={nameHeandler}/>
                </div>
            </BasicTemplateDialog>
        </DialogPortal>
        
    )
}

interface AddPageDeviceActionProps{
    onSave:()=>void
    onHide:()=>void
}

