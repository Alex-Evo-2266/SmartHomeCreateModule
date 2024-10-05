import { ContentBox } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from 'react'
import { EditDialogProps } from '../types'
import { IOption } from 'alex-evo-web-constructor'
import { EditComponentTemplateDialog } from '../Templates/EditTemplate'
import { BaseAction, TypeSrc } from '@renderer/entites/module/models/components'
import { ITable } from '@renderer/entites/module/models/table'
import { getSrcKey, ServerGenerateContentOption } from './SrcGenerateOption'

export const EditTableComponentDialog = ({onHide, onChange, data}:EditDialogProps<ITable>) => {

    const [src, setSrc] = useState<TypeSrc>(data.src ?? TypeSrc.MANUAL)

    const save = useCallback((option: IOption, action: BaseAction)=>{
        onChange({...data, option, action, src, src_key:getSrcKey(src)})
        onHide()
    },[onChange, data, src])

    return(
        <EditComponentTemplateDialog onHide={onHide} onSave={save} data={data}>
            <ContentBox label='base settings'>
                <div></div>
            </ContentBox>
            <ServerGenerateContentOption onChange={setSrc} data={src}/>
        </EditComponentTemplateDialog>
    )
}
