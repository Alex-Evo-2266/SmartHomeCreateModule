import { useCallback } from 'react'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'
import { IGridLayout } from '@renderer/entites/module/models/components'

export const EditGridComponentDialog = ({onHide, onChange, data}:EditDialogProps<IGridLayout>) => {


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
