import {TimeField as TF} from 'alex-evo-sh-ui-kit'

interface ITimeFieldProps{
    onChange?:(value: string)=>void
    name?: string
    value?: string
    validEmptyValue?: boolean
    className?: string
    error?: boolean
    border?: boolean
}

export const TimeField = (props:ITimeFieldProps) => {

    return(
        <TF {...{...props, container:document.getElementById('modal-root')}}/>
    )
}