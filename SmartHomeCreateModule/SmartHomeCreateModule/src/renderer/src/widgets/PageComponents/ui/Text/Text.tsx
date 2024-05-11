import { ITextField } from "@renderer/entites/module/models/pageComponents"
import { useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { RunningLine } from "alex-evo-sh-ui-kit"

interface TextProps{
    data:ITextField
}

export const Text = ({data}:TextProps) => {

    const {mode} = useAppSelector(state=>state.editPageMode)

    return <RunningLine className={`constructor-component constructor-component-text ${(mode)?"component-edit-mode":""}`} text={data.value}/>
}