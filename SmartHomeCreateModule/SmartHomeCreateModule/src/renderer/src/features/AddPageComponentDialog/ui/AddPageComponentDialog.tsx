import { BasicTemplateDialog, ListContainer, ListItem } from 'alex-evo-sh-ui-kit'
import './AddPageComponentDialog.scss'
import { useCallback } from 'react'
import { TypeComponent } from '@renderer/entites/module/models/types'
import { getInitComponent } from '../lib/helper/getComponent'
import { useComponent } from '@renderer/entites/module/lib/hooks/addComponent.hook'
import { COMPONENTS } from '@renderer/entites/module'




interface AddPageComponentDialogProp {
    onHide: ()=>void
}

export const AddPageComponentDialog = ({onHide}:AddPageComponentDialogProp) => {

    const {addComponent} = useComponent()

    const add = useCallback((type: TypeComponent)=>{
        addComponent(getInitComponent(type))
        onHide()
    },[])

    return(
        <BasicTemplateDialog header='add page component' onHide={onHide}>
            <ListContainer transparent>
                {
                    COMPONENTS.map((item, index)=>(
                        <ListItem hovered key={index} icon={item.icon} header={item.title} onClick={()=>add(item.data)}/>
                    ))
                }
            </ListContainer>
        </BasicTemplateDialog>
    )
}