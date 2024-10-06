import { BaseType, ContentBox, JsonContainer, JsonData, SelectField } from 'alex-evo-sh-ui-kit'
import { useCallback } from 'react'
import { ActionFetchTarget, ActionNoTarget, ActionSystemTarget, ActionTarget, ActionType, BaseAction } from '@renderer/entites/module/models/components'
import { SelectURL } from '@renderer/features/UrlDialogs'
import { TypeAPI } from '@renderer/entites/module/models/types'
import { SelectDialog } from '@renderer/features/DialogSelect'

interface EditActionDialogProps{
    data: BaseAction,
    onChange: (data:BaseAction)=>void
    fetchAction?: boolean
}

const actionNone: ActionNoTarget = {action_type:ActionType.NONE}
const actionSystem: ActionSystemTarget = {action_type:ActionType.SYSTEM, action_target:""}
const actionFetch: ActionFetchTarget = {action_type:ActionType.GET_REQUEST, action_target:""}
const actionMenu: ActionTarget = {action_type:ActionType.MENU, action_target:""}
const actionDialog: ActionTarget = {action_type:ActionType.DIALOG, action_target:""}
const actionLink: ActionTarget = {action_type:ActionType.LINK, action_target:""}

const actions:{[key in ActionType]:BaseAction} = {
    [ActionType.NONE]: actionNone,
    [ActionType.DIALOG]: actionDialog,
    [ActionType.GET_REQUEST]: actionFetch,
    [ActionType.LINK]: actionLink,
    [ActionType.MENU]: actionMenu,
    [ActionType.SYSTEM]: actionSystem
}

export const EditActionDialog = ({onChange, data, fetchAction}:EditActionDialogProps) => {

    const getOption = () => Object.values(ActionType)

    const changeTypeHanler = useCallback((value: string) => {
        onChange(actions[(value as ActionType)])
    },[onChange])

    const changeTargetHanler = useCallback((value:string)=>{
        onChange({...data, action_target:value})
    },[data, onChange])

    const argHandler = useCallback((arg:JsonData) => {
        if(Array.isArray(arg))
        {
            const strings = arg.filter(item=>typeof item === 'string')
            onChange({...data as ActionSystemTarget, arg: strings})
        }
    },[data, onChange])

    type StringObject = {[key:string]:string}

    function isObjectStringValue(data:object): data is StringObject{
        for(let item of Object.values(data)){
            if(typeof item !== 'string')
                return false
        }
        return true
    }

    const queryHandler = useCallback((query:JsonData) => {
        if(typeof query === 'object' && isObjectStringValue(query))
            onChange({...data as ActionFetchTarget, query})
    },[data, onChange])

    const queryListType = [ActionType.LINK, ActionType.GET_REQUEST, ActionType.MENU, ActionType.DIALOG]

    function isActionWithQuery(data:BaseAction): data is ActionTarget | ActionFetchTarget{
        return queryListType.includes(data.action_type)
    }

    return(
        <ContentBox label='action'>
            {
                !fetchAction && <SelectField
                    border
                    container={document.getElementById('menu-root')}
                    items={getOption()}
                    value={data.action_type}
                    onChange={changeTypeHanler}
                />
            }
            {
                data.action_type === ActionType.GET_REQUEST?
                <SelectURL border placeholder='target' typeAPI={TypeAPI.ACTION} value={data.action_target} onChange={changeTargetHanler}/>:
                data.action_type === ActionType.DIALOG?
                <SelectDialog border placeholder='target' typeAPI={TypeAPI.ACTION} value={data.action_target} onChange={changeTargetHanler}/>:
                null
            }
            {
                data.action_type === ActionType.SYSTEM &&
                <JsonContainer onlyStringValue baseType={BaseType.ARRAY} name='args' data={data.arg ?? []} onChange={argHandler}/>
            }
            {
                isActionWithQuery(data) &&
                <JsonContainer onlyStringValue baseType={BaseType.OBJECT} name='query' data={data.query ?? {}} onChange={queryHandler}/>
            }
        </ContentBox>
    )
}
