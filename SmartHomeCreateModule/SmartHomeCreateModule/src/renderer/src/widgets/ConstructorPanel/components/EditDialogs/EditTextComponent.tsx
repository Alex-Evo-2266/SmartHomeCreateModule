import { ContentBox, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { ITextField } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'

export const EditTextComponentDialog = ({onHide, onChange, data}:EditDialogProps<ITextField>) => {

    const [value, setValue] = useState<string>(data.value)

    const save = useCallback((options: Options)=>{
        const {option} = options
        onChange({...data, option, value})
        onHide()
    },[onChange, data, value])

    const changeHanler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return(
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data}>
            <ContentBox label='base settings'>
                <TextField border placeholder='value' value={value} onChange={changeHanler}/>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
