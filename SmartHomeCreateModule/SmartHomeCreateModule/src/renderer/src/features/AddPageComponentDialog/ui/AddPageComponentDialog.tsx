import { BasicTemplateDialog, ListContainer, ListItem } from 'alex-evo-sh-ui-kit'
import './AddPageComponentDialog.scss'
import { useCallback } from 'react'
import { COMPONENTS } from '@renderer/entites/module'
import { TypeComponent } from 'alex-evo-web-constructor'
import { DialogPortal } from '@renderer/shared/ui'
import { IComponents } from '@renderer/entites/module/models/components'
import { getInitComponent } from '../lib/helper/getComponent'




interface AddPageComponentDialogProp {
    onHide: ()=>void
    onSelect: (type: IComponents)=>void
}

export const AddPageComponentDialog = ({onHide, onSelect}:AddPageComponentDialogProp) => {

    const add = useCallback((type: TypeComponent)=>{
        onSelect(getInitComponent(type))
        onHide()
    },[onSelect])

    return(
        <DialogPortal>
            <BasicTemplateDialog header='add page component' onHide={onHide}>
                <ListContainer transparent>
                    {
                        COMPONENTS.map((item, index)=>(
                            <ListItem hovered key={index} icon={item.icon} header={item.title} onClick={()=>add(item.data)}/>
                        ))
                    }
                </ListContainer>
            </BasicTemplateDialog>
        </DialogPortal>
        
    )
}