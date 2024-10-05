import { FullScrinTemplateDialog } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { DialogPortal } from '@renderer/shared/ui'
import { ActionFetchTarget, ActionType, BaseAction, IComponents } from '@renderer/entites/module/models/components'
import { OptionVisible } from '../types'
import { EditActionDialog } from '../Templates/EditAction'
import { IOption } from 'alex-evo-web-constructor'
import { isAction, isFetch } from '@renderer/pages/ConstructorPage/utils'
import { EditOptionDialog } from './EditOption'

interface EditComponentTemplateDialogProps<T extends IComponents>{
        optionVisible?: OptionVisible
        children?: React.ReactNode
        onSave: (option: IOption, action: BaseAction | ActionFetchTarget)=>void
        data: T
        onHide: ()=>void
        fetchAction?: boolean
    }

export const EditComponentTemplateDialog = <T extends IComponents,>({onHide, onSave, data, optionVisible, children, fetchAction}:EditComponentTemplateDialogProps<T>) => {

    const [option, setOption] = useState<IOption>(data.option ?? {})
    const [action, setAction] = useState<BaseAction>(function(data: T, fetchAction:boolean){
        if(isFetch(data) || isAction(data))
            return data.action
        if(fetchAction)
            return {action_type: ActionType.GET_REQUEST, action_target:""}
        return {action_type: ActionType.NONE}
    }(data, fetchAction ?? false))

    const save = useCallback(()=>{
        onSave(option, action)
    },[onSave, action, option])

    const actionHanler = (data: BaseAction) => {
        setAction(data)
    }

    const optionHanler = (data: IOption) => {
        setOption(data)
    }

    return(
        <DialogPortal>
            <FullScrinTemplateDialog onHide={onHide} onSave={save}>
                {children}
                {
                    (isFetch(data) || isAction(data)) && <EditActionDialog data={action} onChange={actionHanler} fetchAction={fetchAction}/>
                }
                <EditOptionDialog option={optionVisible} data={option} onChange={optionHanler}/>
            </FullScrinTemplateDialog>
        </DialogPortal>
        
    )
}
