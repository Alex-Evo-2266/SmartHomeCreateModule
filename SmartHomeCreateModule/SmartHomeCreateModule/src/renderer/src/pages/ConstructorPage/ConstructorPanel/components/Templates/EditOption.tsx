import { useCallback } from 'react'
import { IOption } from 'alex-evo-web-constructor'
import { OptionVisible } from '../types'
import { ColorField } from '@renderer/shared/ui'
import { ContentBox, NumberField, SigmentedButton, TextField } from 'alex-evo-sh-ui-kit'

interface EditActionDialogProps{
    data: IOption,
    onChange: (data:IOption)=>void
    option?: OptionVisible
}

export const EditOptionDialog = ({onChange, data, option}:EditActionDialogProps) => {

    const changeBackgroundColor = useCallback((value) => {
        onChange({...data, backgroundColor: value})
    },[onChange, data])

    const changeColor = useCallback((value) => {
        onChange({...data, color: value})
    },[onChange, data])

    const changeNumber = useCallback((value, name) => {
        onChange({...data, [name]: value})
    },[onChange, data])

    const changeText = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        onChange({...data, [event.target.name]: event.target.value})
    },[onChange, data])

    const changeSegments = useCallback((value: string[]) => {
        onChange({...data, pozition: value[0] as ("left" | "right" | "center") })
    },[onChange, data])

    return(
        <ContentBox label='option' hiding border style={{margin: "0 10px"}}>
            {
                (!option || option?.backgroundColor) && <ColorField border value={data.backgroundColor} onChange={changeBackgroundColor}/>
            }
            {
                (!option || option?.color) && <ColorField border value={data.color} onChange={changeColor}/>
            }
            {
                (!option || option?.borderRadius) && <NumberField placeholder='borderRadius' name='borderRadius' border value={data.borderRadius} onChange={changeNumber}/>
            }
            {
                (!option || option?.fontSize) && <NumberField placeholder='fontSize' name='fontSize' border value={data.fontSize} onChange={changeNumber}/>
            }
            {
                (!option || option?.height) && <NumberField placeholder='height' name='height' border value={data.height} onChange={changeNumber}/>
            }
            {
                (!option || option?.width) && <NumberField placeholder='width' name='width' border value={data.width} onChange={changeNumber}/>
            }
            {
                (!option || option?.margin) && <TextField placeholder='margin' name='margin' border value={data.margin} onChange={changeText}/>
            }
            {
                (!option || option?.padding) && <TextField placeholder='padding' name='padding' border value={data.padding} onChange={changeText}/>
            }
            {
                (!option || option?.pozition) && <SigmentedButton value={data.pozition} items={['right', 'center', 'left']} onChange={changeSegments}/>
            }
        </ContentBox>
    )
}
