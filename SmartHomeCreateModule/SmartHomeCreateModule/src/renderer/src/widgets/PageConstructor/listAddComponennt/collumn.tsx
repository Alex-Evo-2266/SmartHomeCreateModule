import { IComponents, Src } from "@renderer/entites/module/models/pageModel"
import { AddPageComponentDialog } from "@renderer/features/AddPageComponentDialog"
import { Divider, ListItem } from "alex-evo-sh-ui-kit"
import { IColumns } from "alex-evo-web-constructor"
import { IColumnElement } from "alex-evo-web-constructor/dist/models"
import React, { useCallback, useState } from "react"

interface ColumnListProps{
    component: IColumns & {src: Src}
    onChange: (data: IColumns & {src: Src}) => void
}

export const ColumnList:React.FC<ColumnListProps> = ({component, onChange}) => {

    const [add, setAdd] = useState<number | null>(null)

    const getColumnItem = (components: IColumnElement[], index: number) => components.filter(item=>item.indexCol === index)

    const addItem = useCallback((newComponent:IComponents, index: number) => {
        onChange({...component, value:[...component.value, {indexCol: index, value: newComponent}]})
    },[onChange, component])

    return(
        <>
        {
            Array(component.count).fill("").map((_, index)=>(
            <React.Fragment key={`col-${index}`}>
                {
                    getColumnItem(component.value, index).map((item, index2)=>(
                        <ListItem key={`col-${index}-item-${index2}`} header={item.value.type}/>
                    ))
                }
                <ListItem header="add item" hovered onClick={()=>setAdd(index)}/>
                <Divider/>
            </React.Fragment>
            ))
        }
        {
            (add !== null)?
            <AddPageComponentDialog onHide={()=>setAdd(null)} onSelect={(data)=>addItem(data, add)}/>:
            null
        }
        </>
    )
}