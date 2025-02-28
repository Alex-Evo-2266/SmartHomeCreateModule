import { ContentBox, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { IJSON } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'

export const EditJSONComponentDialog = ({onHide, onChange, data}:EditDialogProps<IJSON>) => {

    const [value, setValue] = useState<string>(data.value)
    const [name, setName] = useState<string>(data.name ?? "")

    const save = useCallback((options: Options)=>{
        const {option} = options
        onChange({...data, option, value, name})
        onHide()
    },[onChange, data, value, name])

    const changeHanler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const changeNameHanler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }


    return(
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data}>
            <ContentBox label='base settings'>
                <TextField border placeholder='value' value={value} onChange={changeHanler}/>
                <TextField border placeholder='name' value={name} onChange={changeNameHanler}/>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
