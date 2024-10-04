import { ContentBox, NumberField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { IColumns } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog } from '../Templates/EditTemplate'
import { IOption } from 'alex-evo-web-constructor'

export const EditColumnComponentDialog = ({onHide, onChange, data}:EditDialogProps<IColumns>) => {

    const [count, setCount] = useState<number>(data.count)

    const save = useCallback((option: IOption)=>{
        onChange({...data, count, option})
        onHide()
    },[onChange, data, count])

    return(
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data} optionVisible={{}}>
            <ContentBox label='base settings'>
                <NumberField border min={1} max={10} value={count} onChange={setCount}/>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
