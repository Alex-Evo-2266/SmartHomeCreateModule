import { ContentBox, ListContainer, ListItem, Typography } from 'alex-evo-sh-ui-kit'
import './ConstructorPanel.scss'
import { Library, Plus } from 'lucide-react'
import { AddPageComponentDialog } from '@renderer/features/AddPageComponentDialog'
import { useCallback, useMemo, useState } from 'react'
import { IComponents } from '@renderer/entites/module/models/pageModel'
import { TypeComponent } from 'alex-evo-web-constructor'
import { ComponentItem, COMPONENTS } from '@renderer/entites/module'
import { ComponentEdit } from './editComponent/editComponents'
import { AddComponent } from './listAddComponennt/addComponent'

interface ConstructorPanelProps{
    component?: IComponents | null | undefined,
    onChange: (data: IComponents | undefined | null)=>void
}

const getIconComponent = (type?: TypeComponent) => COMPONENTS.find(item=>item.data === type)

export const ConstructorPanel:React.FC<ConstructorPanelProps> = ({component, onChange}) => {

    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState<IComponents | null | undefined>(null)
    const componentItem = useMemo<ComponentItem<TypeComponent> | undefined | null>(()=>getIconComponent(component?.type),[component])

    const addComponent = useCallback((newComponent: IComponents)=>{
        onChange(newComponent)
    },[component, onChange])

    const editComponent = useCallback((component: IComponents) => {
        setEdit(component)
    },[])

    const changeHandler = useCallback((data: IComponents)=>{
        onChange(data)
    },[onChange])
    
    
    return(
        <>
        <div className='constructor-panel'>
            <Typography type='heading'>Constructor</Typography>
            <ContentBox label='Root' className='constructor-box'>
                <ListContainer className='list-item-constructor-container' transparent>
                    {
                        (component)?
                        <ListItem className='list-item-constructor' hovered icon={componentItem?.icon || <Library/>} onClick={()=>editComponent(component)} header={componentItem?.title}/>:
                        <ListItem className='list-item-constructor' hovered icon={<Plus/>} onClick={()=>setAdd(true)} header='add block'/>
                    }
                    {
                        (component)?
                        <AddComponent component={component} onChange={changeHandler}/>:
                        null
                    }
                </ListContainer>
            </ContentBox>
            
        </div>
        {
            (add)?
            <AddPageComponentDialog onHide={()=>setAdd(false)} onSelect={addComponent}/>:
            null
        }
        {
            (edit)?
            <ComponentEdit onHide={()=>setEdit(null)} onSave={changeHandler} data={edit}/>:
            null
        }
        </>
        
    )
}