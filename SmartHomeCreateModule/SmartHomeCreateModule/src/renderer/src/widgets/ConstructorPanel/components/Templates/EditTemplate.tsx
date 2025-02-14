import { FullScrinTemplateDialog } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { DialogPortal } from '@renderer/shared/ui'
import { ActionFetchTarget, ActionType, BaseAction, IComponents, TypeSrc } from '@renderer/entites/module/models/components'
import { OptionVisible } from '../types'
import { EditActionDialog } from './EditAction'
import { IOption } from 'alex-evo-web-constructor'
import { isAction, isContainerMoreComponents, isFetch, isGenerateContent } from '@renderer/entites/module/lib/helpers/utils'
import { EditOptionDialog } from './EditOption'
import { getSrcKey, ServerGenerateContentOption } from './SrcGenerateOption'
import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { setFunctionModule } from '@renderer/entites/module/lib/reducers/moduleReducer'
import { FORMATER_FILE_TENPLATE } from '@renderer/entites/module/lib/consts/functions'

export type Options = {
    option: IOption,
    action: BaseAction | ActionFetchTarget,
    src?: TypeSrc,
    src_key: string | undefined
}

interface EditComponentTemplateDialogProps<T extends IComponents>{
        optionVisible?: OptionVisible | null
        children?: React.ReactNode
        onSave: (data:Options)=>void
        data: T
        onHide: ()=>void
        fetchAction?: boolean
    }

export const EditComponentTemplateDialog = <T extends IComponents,>({onHide, onSave, data, optionVisible, children, fetchAction}:EditComponentTemplateDialogProps<T>) => {

    const [option, setOption] = useState<IOption>(data.option ?? {})
    const {functions} = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()
    const [src, setSrc] = useState<TypeSrc | undefined>(function(data: T){
        if(isGenerateContent(data))
            return data.src ?? TypeSrc.MANUAL
        return 
    }(data))
    const [action, setAction] = useState<BaseAction>(function(data: T, fetchAction:boolean){
        if(isFetch(data) || isAction(data))
            return data.action
        if(fetchAction)
            return {action_type: ActionType.GET_REQUEST, action_target:""}
        return {action_type: ActionType.NONE}
    }(data, fetchAction ?? false))

    const save = useCallback(()=>{
        if(isContainerMoreComponents(data) && src !== data.src){
            if(data.src_key){
                dispatch(setFunctionModule(functions.filter(item=>item.key !== data.src_key)))
            }
            const src_key = getSrcKey(src)
            if(src_key){
                dispatch(setFunctionModule([...functions, {
                    key: src_key,
                    type: data.type,
                    name: data.name,
                    code: FORMATER_FILE_TENPLATE
                }]))
            }
            onSave({option, action, src, src_key:src_key})
        }
        else if(isContainerMoreComponents(data)){
            onSave({option, action, src, src_key:data.src_key})
        }
        else{
            onSave({option, action, src, src_key:undefined})
        }
    },[onSave, action, option, src, data])

    const actionHanler = (data: BaseAction) => {
        setAction(data)
    }

    const optionHanler = (data: IOption) => {
        setOption(data)
    }

    return(
        <DialogPortal>
            <FullScrinTemplateDialog onHide={onHide} onSave={save}>
                {
                    (isGenerateContent(data)) && <ServerGenerateContentOption onChange={setSrc} data={src ?? TypeSrc.MANUAL}/>
                }
                {
                    (!src || src === TypeSrc.MANUAL) && children
                }
                {
                    (isFetch(data) || isAction(data)) && <EditActionDialog data={action} onChange={actionHanler} fetchAction={fetchAction}/>
                }
                {
                    optionVisible !== null && <EditOptionDialog option={optionVisible} data={option} onChange={optionHanler}/>
                }
            </FullScrinTemplateDialog>
        </DialogPortal>
        
    )
}
