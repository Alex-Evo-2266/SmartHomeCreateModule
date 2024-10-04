import { ContentBox, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { EditDialogProps } from '../types'
import { IKeyValue } from '@renderer/entites/module/models/components'
import { IOption } from 'alex-evo-web-constructor'
import { EditComponentTemplateDialog } from '../Templates/EditTemplate'

export const EditKeyValueComponentDialog = ({onHide, onChange, data}:EditDialogProps<IKeyValue>) => {

    const [label, setLabel] = useState<string>(data.label)

    const save = useCallback((option: IOption)=>{
        onChange({...data, option, label})
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
