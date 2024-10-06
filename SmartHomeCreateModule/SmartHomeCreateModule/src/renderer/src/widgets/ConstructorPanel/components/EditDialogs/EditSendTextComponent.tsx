import { useCallback } from 'react'
import { ActionType, ISendText } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'

export const EditSendTextComponentDialog = ({onHide, onChange, data}:EditDialogProps<ISendText>) => {

    const save = useCallback((options: Options)=>{
        const {option, action} = options
        if(action.action_type === ActionType.GET_REQUEST)
        {
            onChange({...data, action, option})
            onHide()
        }
    },[onChange, data])

    return(
        <EditComponentTemplateDialog fetchAction onHide={onHide} onSave={save} data={data} optionVisible={{}}/>
    )
}
