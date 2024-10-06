import { ContentBox, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { EditDialogProps } from '../types'
import { ICard } from '@renderer/entites/module/models/components'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'

export const EditCardComponentDialog = ({onHide, onChange, data}:EditDialogProps<ICard>) => {

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
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data} optionVisible={{
            backgroundColor: true,
            color: true,
            margin: true,
            padding: true,
            borderRadius: true,
            width: true, 
            height: true
        }}>
            <ContentBox label='base settings'>
                <TextField border placeholder='label' value={label} onChange={changeHanler}/>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
