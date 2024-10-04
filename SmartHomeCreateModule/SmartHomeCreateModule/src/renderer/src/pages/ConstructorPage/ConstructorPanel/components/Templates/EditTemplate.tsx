import { FullScrinTemplateDialog } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { DialogPortal } from '@renderer/shared/ui'
import { ActionType, BaseAction, IComponents } from '@renderer/entites/module/models/components'
import { OptionVisible } from '../types'
import { EditActionDialog } from '../Templates/EditAction'
import { IOption } from 'alex-evo-web-constructor'
import { isAction } from '@renderer/pages/ConstructorPage/utils'
import { EditOptionDialog } from './EditOption'

interface EditComponentTemplateDialogProps<T extends IComponents>{
        optionVisible?: OptionVisible
        children?: React.ReactNode
        onSave: (option: IOption, action: BaseAction)=>void
        data: T
        onHide: ()=>void
    }

export const EditComponentTemplateDialog = <T extends IComponents,>({onHide, onSave, data, optionVisible, children}:EditComponentTemplateDialogProps<T>) => {

    const [action, setAction] = useState<BaseAction>(isAction(data)? data.action: {action_type: ActionType.NONE})
    const [option, setOption] = useState<IOption>(data.option ?? {})

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
                    isAction(data) && <EditActionDialog data={action} onChange={actionHanler}/>
                }
                <EditOptionDialog option={optionVisible} data={option} onChange={optionHanler}/>
            </FullScrinTemplateDialog>
        </DialogPortal>
        
    )
}
