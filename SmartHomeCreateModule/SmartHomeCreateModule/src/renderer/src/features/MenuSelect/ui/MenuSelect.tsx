import { useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { SelectField } from "@renderer/shared/ui/Select/Select"
import { IOption } from "alex-evo-sh-ui-kit"
import { useCallback } from "react"

export interface ISelectFieldProps{
    onChange?:(value: string)=>void
    value?: string
    placeholder?: string
    className?: string
    border?: boolean
    name?: string
    error?: boolean
    onFocus?: (e:React.FocusEvent<HTMLInputElement>)=>void
    onBlur?: (e:React.FocusEvent<HTMLInputElement>)=>void
}

export const MenuSelect:React.FC<ISelectFieldProps> = (props) => {

    const {menu} = useAppSelector(state=>state.module)

    const getItems = useCallback(() => {
        const items:IOption[] = menu
        .map(item=>({
            title: item.name,
            value: item.name
        }))
        return items
    },[menu])

    const changeHandler = useCallback((value:string) => {
        props.onChange && props.onChange(value)
    },[props.onChange])

    return(
        <SelectField {...{...props, items:getItems(), onChange:changeHandler}}/>
    )
}