import { AppWindowMac, MousePointerClick, Tally4, Type } from 'lucide-react'
import { BasicTemplateDialog, ListContainer, ListItem } from 'alex-evo-sh-ui-kit'
import './AddPageComponentDialog.scss'
import { useCallback } from 'react'
import { TypeComponent } from '@renderer/entites/module/models/typeComponents'
import { getInitComponent } from '../lib/helper/getComponent'
import { useComponent } from '@renderer/entites/module/lib/hooks/addComponent.hook'

interface ComponentItem {
    title: string
    icon: React.ReactNode
    data: TypeComponent
}

const COMPONENTS:ComponentItem[] = [
    {
        title: "collumn",
        icon: <Tally4/>,
        data: TypeComponent.COLUMNS
    },
    {
        title: "text",
        icon: <Type/>,
        data: TypeComponent.TEXT
    },
    {
        title: "Card",
        icon: <AppWindowMac/>,
        data: TypeComponent.CARD
    },
    {
        title: "Button",
        icon: <MousePointerClick/>,
        data: TypeComponent.BUTTON
    },
    {
        title: "form",
        icon: <span>F</span>,
        data: TypeComponent.FORM
    }
]

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