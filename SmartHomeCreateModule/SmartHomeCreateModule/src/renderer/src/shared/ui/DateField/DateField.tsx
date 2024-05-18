import {DateField as DF} from 'alex-evo-sh-ui-kit'

interface ITimeFieldProps{
    onChange?:(value: string)=>void
    name?: string
    value?: string
    validEmptyValue?: boolean
    className?: string
    error?: boolean
    border?: boolean
}

export const DateField = (props:ITimeFieldProps) => {

    return(
        <DF {...{...props, container:document.getElementById('modal-root')}}/>
    )
}