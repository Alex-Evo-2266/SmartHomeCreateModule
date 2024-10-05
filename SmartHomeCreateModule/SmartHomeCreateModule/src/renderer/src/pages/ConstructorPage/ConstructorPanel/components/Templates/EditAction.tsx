import { BaseType, ContentBox, JsonContainer, JsonData, SelectField, TextField } from 'alex-evo-sh-ui-kit'
import { useCallback } from 'react'
import { ActionFetchTarget, ActionNoTarget, ActionSystemTarget, ActionTarget, ActionType, BaseAction } from '@renderer/entites/module/models/components'

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

const targetIncludeType = [ActionType.DIALOG, ActionType.GET_REQUEST, ActionType.LINK, ActionType.MENU, ActionType.SYSTEM]

export const EditActionDialog = ({onChange, data, fetchAction}:EditActionDialogProps) => {

    const getOption = () => Object.values(ActionType)

    const changeTypeHanler = useCallback((value: string) => {
        onChange(actions[(value as ActionType)])
    },[onChange])

    const changeHanler = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        onChange({...data, action_target:e.target.value})
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
                targetIncludeType.includes(data.action_type) &&
                <TextField value={data.action_target} name='action_target' onChange={changeHanler} border placeholder='target'/>
            }
            {
                data.action_type === ActionType.SYSTEM &&
                <JsonContainer onlyStringValue baseType={BaseType.ARRAY} name='args' data={data.arg ?? []} onChange={argHandler}/>
            }
            {
                data.action_type === ActionType.GET_REQUEST &&
                <JsonContainer onlyStringValue baseType={BaseType.OBJECT} name='query' data={data.query ?? {}} onChange={queryHandler}/>
            }
        </ContentBox>
    )
}
