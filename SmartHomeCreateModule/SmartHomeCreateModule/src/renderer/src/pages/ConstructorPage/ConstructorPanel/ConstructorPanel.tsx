
import { Button } from 'alex-evo-sh-ui-kit'
import './ConstructorPanel.scss'
import { IComponents } from 'alex-evo-web-constructor'
import { AddPageComponentDialog } from '@renderer/features/AddPageComponentDialog/ui/AddPageComponentDialog'
import { useCallback, useState } from 'react'
import { ComponentBox } from './components/Components'

interface ConstructorPanelProps{
    component: IComponents | undefined | null, 
    onChange: (data: IComponents | undefined)=>void
}

export const ConstructorPanel:React.FC<ConstructorPanelProps> = ({component, onChange}) => {

    const [addDialogVisible, setAddDialogVisible] = useState<boolean>(false)

    const changeComponent = useCallback((data: IComponents) => {
        onChange(data)
    },[onChange])

    const deleteHandler = useCallback(() => {
        onChange(undefined)
    },[onChange])

    return(
        <>
        <div className="constructor-panel">
            {!component && <Button onClick={()=>{window.location.pathname = '/home'}}>exit</Button>}
            {
                (!component)?
                <Button onClick={()=>setAddDialogVisible(true)}>add</Button>:
                <ComponentBox component={component} onChange={changeComponent} onDelete={deleteHandler}/>
            }
        </div>
        {
            addDialogVisible && <AddPageComponentDialog onHide={()=>setAddDialogVisible(false)} onSelect={changeComponent}/>
        }
        </>
    )
}