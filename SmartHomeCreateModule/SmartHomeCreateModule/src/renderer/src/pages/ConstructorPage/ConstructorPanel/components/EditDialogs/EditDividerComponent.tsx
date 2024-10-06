import { ContentBox, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { IDivider } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'

export const EditDividerComponentDialog = ({onHide, onChange, data}:EditDialogProps<IDivider>) => {

    const [label, setLabel] = useState<string>(data.label ?? "")

    const save = useCallback((options: Options)=>{
        const {option} = options
        onChange({...data, option, label: (label === "")?undefined:label})
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
