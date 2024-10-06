import { ContentBox, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { IButton } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'

export const EditButtonComponentDialog = ({onHide, onChange, data}:EditDialogProps<IButton>) => {

    const [label, setLabel] = useState<string>(data.label)

    const save = useCallback((options: Options)=>{
        const {option, action} = options
        onChange({...data, label, action, option})
        onHide()
    },[onChange, data, label])

    const changeHanler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value)
    }

    return(
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data}>
            <ContentBox label='base settings'>
                <TextField border placeholder='label' value={label} onChange={changeHanler}/>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
