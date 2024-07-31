import { useComponent } from '@renderer/entites/module/lib/hooks/addComponent.hook'
import { IColumns, IComponents } from '@renderer/entites/module/models/pageModels/pageModel'
import {ColumnLayout} from 'alex-evo-sh-ui-kit'
import { useCallback } from 'react'
import { PageComponent } from '../..'
import { useAppSelector } from '@renderer/shared/lib/hooks/redux'


export interface ColumnProps{
    data: IColumns
    onEdit: (newData: IColumns)=>void
}

export const Column:React.FC<ColumnProps> = ({data, onEdit}) => {

    const {getComponent} = useComponent()
    const {mode} = useAppSelector(state=>state.editPageMode)

    const addComponent = useCallback((index:number, e:React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if(target.closest(".component-container") == e.currentTarget)
        {
            let component = getComponent()
            if(!component)
                return
            onEdit({...data, value:[...data.value, {indexCol:index, value:component}]})
        }
    },[getComponent, data, onEdit])

    const editChildren = useCallback((index: number, newData:IComponents) => {
        let children = data.value.slice()
        children[index] = {indexCol: children[index].indexCol, value: newData}
        onEdit({...data, value:children})
    },[onEdit, data])

    const deleteComponent = useCallback((index) => {
        const newComponents = data.value.filter((_, index2)=>index2 != index)
        onEdit({...data, value:newComponents})
    },[data])

    return(
        <ColumnLayout 
            items={
                data.value.map((item, index)=>({
                    indexCol: item.indexCol, 
                    node:<PageComponent onDelete={deleteComponent} index={index} onEdit={editChildren} data={item.value}/>
                }))
            }
            className={`constructor-component constructor-component-column ${(mode)?"component-edit-mode":""}`}
            classNameColumn={`component-container`} 
            countColumn={data.count} 
            onClickColl={addComponent}
        />
    )
}