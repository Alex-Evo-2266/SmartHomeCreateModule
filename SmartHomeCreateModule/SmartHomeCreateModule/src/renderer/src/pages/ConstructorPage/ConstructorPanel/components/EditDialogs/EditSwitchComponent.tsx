import { useCallback } from 'react'
import { ActionFetchTarget, ActionType, BaseAction, ISwitch } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog } from '../Templates/EditTemplate'
import { IOption } from 'alex-evo-web-constructor'

export const EditSwitchComponentDialog = ({onHide, onChange, data}:EditDialogProps<ISwitch>) => {

    const save = useCallback((option: IOption, action: BaseAction | ActionFetchTarget)=>{
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
