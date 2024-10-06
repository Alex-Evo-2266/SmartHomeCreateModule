import { ContentBox, NumberField } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { ActionType, ISlider } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'

export const EditSliderComponentDialog = ({onHide, onChange, data}:EditDialogProps<ISlider>) => {

    const [max, setMax] = useState<number>(data.max || 100)
    const [min, setMin] = useState<number>(data.min || 0)
    const [step, setStep] = useState<number>(data.step || 1)

    const save = useCallback((options: Options)=>{
        const {option, action} = options
        if(action.action_type === ActionType.GET_REQUEST)
        {
            onChange({...data, action, option, max, min, step})
            onHide()
        }
    },[onChange, data, max, min, step])

    return(
        <EditComponentTemplateDialog fetchAction onHide={onHide} onSave={save} data={data} optionVisible={{}}>
            <ContentBox label='base settings'>
                <NumberField placeholder='min' name='min' border value={min} onChange={setMin}/>
                <NumberField placeholder='max' name='max' border value={max} onChange={setMax}/>
                <NumberField placeholder='step' name='step' border value={step} onChange={setStep}/>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
