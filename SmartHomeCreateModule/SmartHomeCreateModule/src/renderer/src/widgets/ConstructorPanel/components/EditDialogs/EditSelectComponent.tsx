import { ContentBox, MoreText } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { ActionType, ISelect } from '@renderer/entites/module/models/components'
import { EditDialogProps } from '../types'
import { EditComponentTemplateDialog, Options } from '../Templates/EditTemplate'
import { joinItems, SelectItens, splitItems } from '@renderer/entites/module/lib/helpers/utils'

export const EditSelectComponentDialog = ({onHide, onChange, data}:EditDialogProps<ISelect>) => {

    const [items, setItem] = useState<SelectItens>(data.items)

    const save = useCallback((options: Options)=>{
        const {option, action} = options
        if(action.action_type === ActionType.GET_REQUEST)
        {
            onChange({...data, action, option, items})
            onHide()
        }
    },[onChange, data, items])

    const changeItemsHanler = (value: string) => {
        setItem(splitItems(value))
    }

    return(
        <EditComponentTemplateDialog fetchAction onHide={onHide} onSave={save} data={data} optionVisible={{}}>
            <ContentBox label='base settings'>
                <MoreText border value={joinItems(items)} onChange={changeItemsHanler}/>
            </ContentBox>
        </EditComponentTemplateDialog>
    )
}
