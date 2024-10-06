import { TypeSrc } from "@renderer/entites/module/models/components"
import { ContentBox, SigmentedButton } from "alex-evo-sh-ui-kit"
import { useCallback } from "react"

export interface ServerGenerateContentOptionProps{
    onChange:(data:TypeSrc)=>void
    data:TypeSrc
}

export const ServerGenerateContentOption = ({onChange, data}:ServerGenerateContentOptionProps) => {

    const SERVER_GENERATE = TypeSrc.SERVER_GENERATE.toString()

    const changeHandler = useCallback((data:string[]) => {
        if(data[0] === SERVER_GENERATE)
            onChange(TypeSrc.SERVER_GENERATE)
        else
            onChange(TypeSrc.MANUAL)
    },[onChange])

    return(
        <ContentBox label='server generete content'>
            <SigmentedButton items={[TypeSrc.MANUAL, TypeSrc.SERVER_GENERATE]} value={data} onChange={changeHandler}/>
        </ContentBox>
    )
}

export function getSrcKey(src?: TypeSrc):string | undefined{
    if(src === TypeSrc.SERVER_GENERATE)
        return crypto.randomUUID()
    return
}