import { ContentBox } from 'alex-evo-sh-ui-kit'
import { useCallback } from 'react'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'
import { ITable } from '@renderer/entites/module/models/table'
import { getSrcKey } from '../Templates/SrcGenerateOption'

export const EditTableComponentDialog = ({onHide, onChange, data}:EditDialogProps<ITable>) => {

    const save = useCallback((options:Options)=>{
        const {option, action, src} = options
        onChange({...data, option, action, src_key:getSrcKey(src)})
        onHide()
    },[onChange, data])

    return(
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data}>
            <ContentBox label='base settings'>
                <div></div>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
