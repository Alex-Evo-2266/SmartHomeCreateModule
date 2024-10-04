import { ContentBox, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { BaseAction, IButton } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog } from '../Templates/EditTemplate'
import { IOption } from 'alex-evo-web-constructor'

export const EditButtonComponentDialog = ({onHide, onChange, data}:EditDialogProps<IButton>) => {

    const [label, setLabel] = useState<string>(data.label)

    const save = useCallback((option: IOption, action: BaseAction)=>{
        onChange({...data, label, action, option})
        onHide()
    },[onChange, data, label])

    const changeHanler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value)
    }

    return(
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data} optionVisible={{}}>
            <ContentBox label='base settings'>
                <TextField border placeholder='label' value={label} onChange={changeHanler}/>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
