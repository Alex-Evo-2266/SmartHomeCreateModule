import { ActionType, BaseAction } from "@renderer/entites/module/models/pageModels/pageModel"
import { TypeAPI } from "@renderer/entites/module/models/types"
import { SelectURL } from "@renderer/features/UrlDialogs"
import { FieldContainer, SigmentedButton } from "alex-evo-sh-ui-kit"
import React, { useCallback, useState } from "react"

interface EditActionProps{
    data: BaseAction
    onChange: (nameField: string, value: string)=>void
}

export const EditAction:React.FC<EditActionProps> = ({onChange, data}) => {

    const [typeAction, setTypeAction] = useState<ActionType>(data.action_type)
    const actionTypeHandler = useCallback((value: string[]) => {
        setTypeAction(value[0] as ActionType)
        onChange("action_type", value[0] as ActionType)
    },[onChange])

    return(
        <FieldContainer header='action'>
            <SigmentedButton value={typeAction} onChange={actionTypeHandler} items={Object.values(ActionType)}/>
            {
                (typeAction === ActionType.GET_REQUEST)?
                <SelectURL typeAPI={TypeAPI.ACTION} border placeholder="src content" value={data.action_target} onChange={(value)=>onChange("action_target" ,value)}/>:
                null
            }
        </FieldContainer>
    )
}

export const useEditAction = (data:BaseAction) => {

    const [action, setAction] = useState<BaseAction>({action_type: data.action_type, action_target: data.action_target})

    const changeAction = useCallback((name: string, value: any) => {
        setAction({...action, [name]:value})
    },[action])

    return {changeAction ,action, setAction}
}