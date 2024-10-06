import { useCallback } from 'react'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'
import { IList } from '@renderer/entites/module/models/components'

export const EditListComponentDialog = ({onHide, onChange, data}:EditDialogProps<IList>) => {

    const save = useCallback((options: Options)=>{
        const {option, src, src_key} = options
        onChange({...data, option, src, src_key})
        onHide()
    },[onChange, data])

    return(
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data}>
        </EditComponentTemplateDialog>
    )
}
