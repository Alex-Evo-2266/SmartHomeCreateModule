import { BaseControl } from "@renderer/entites/module/models/pageModels/pageModel"
import { TypeAPI } from "@renderer/entites/module/models/types"
import { SelectURL } from "@renderer/features/UrlDialogs"
import { FieldContainer } from "alex-evo-sh-ui-kit"
import { useCallback, useState } from "react"

interface EditControlProps{
    data: BaseControl,
    onChange: (nameField: string, value: string)=>void
    manualSetControl?: boolean
}

export const EditControl:React.FC<EditControlProps> = ({data, onChange, manualSetControl = true}) => {

    return(
        <FieldContainer header="control">
            <SelectURL typeAPI={TypeAPI.CARD_CONTROL} border placeholder="src control" value={data.control_target} onChange={value=>onChange("control_target", value)}/>
            {
                (manualSetControl)?
                <>
                
                </>:
                null
            }
        </FieldContainer>
    )
}

export const useEditControl = (data:BaseControl) => {

    const [control, setControl] = useState<BaseControl>({control_target: data.control_target, control:data.control})

    const changeControl = useCallback((name: string, value: any) => {
        setControl({...control, [name]:value})
    },[control])

    return {changeControl ,control, setControl}
}