import { IColumns, IComponents } from "@renderer/entites/module/models/components"
import { AddPageComponentDialog } from "@renderer/features/AddPageComponentDialog/ui/AddPageComponentDialog"
import { BaseDialog, Button, ContentBox, OutlineButton } from "alex-evo-sh-ui-kit"
import { useCallback, useState } from "react"
import { ComponentBox } from "./Components"

import './Columns.scss'
import { EditColumnComponentDialog } from "./EditDialogs/EditColumnComponent"
import { BasePropsComponent } from "./types"
import { DialogPortal } from "@renderer/shared/ui"
import { Trash2 } from "lucide-react"

export const ColumnBox:React.FC<BasePropsComponent<IColumns>> = ({component, onChange, onDelete}) => {

    const [addDialog, setAddDialog] = useState<number | null>(null)
    const [editDialog, setEditDialog] = useState<boolean>(false)
    const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false)

    const getColumn = (component: IColumns, index: number) => {
        return component.value.map((item, index)=>({item, index})).filter(item=>item.item.indexCol === index)
    }

    const addComponent = useCallback((data: IComponents, indexCol: number) => {
        onChange({...component, value:[...component.value, {
            indexCol: indexCol,
            value: data
        }]})
    },[onChange, component])

    const changeHanler = useCallback((data: IComponents, index: number) => {
        const arrValue = component.value.slice()
        arrValue[index].value = data
        onChange({...component, value:arrValue})
    },[onChange, component])

    const deleteHandler = useCallback(() => {
        onDelete && onDelete()
    },[onDelete])

    const deleteItemHandler = useCallback((index:number)=>{
        const arrValue = component.value.filter((_, indexComponent)=>indexComponent !== index)
        onChange({...component, value:arrValue})
    },[onChange, component])

    return(
        <ContentBox hiding border label={component.type} action={{
            onClick: ()=>setDeleteDialogVisible(true),
            icon: <Trash2 color="var(--Error-color)"/>
        }}>
            <OutlineButton className="add-component-button" onClick={()=>setEditDialog(true)}>edit</OutlineButton>
        {
            Array(component.count).fill("").map((_, index)=>(
                <ContentBox className="col-box" hiding border key={`col-${index}`} label={String(index)}>
                {
                    getColumn(component, index).map((item2, index2)=>(
                        <ComponentBox
                            key={`col-${index}-item-${index2}`} 
                            onChange={(data)=>changeHanler(data, item2.index)} 
                            component={item2.item.value}
                            onDelete={()=>deleteItemHandler(item2.index)}
                        />
                    ))
                }
                <Button styleType='filled' className="add-component-button" onClick={()=>setAddDialog(index)}>add</Button>
                </ContentBox>
            ))
        }
        {
            addDialog !== null && <AddPageComponentDialog onHide={()=>setAddDialog(null)} onSelect={(data)=>addComponent(data, addDialog)}/>
        }
        {
            editDialog && <EditColumnComponentDialog data={component} onHide={()=>setEditDialog(false)} onChange={onChange}/>
        }
        {
            deleteDialogVisible && <DialogPortal>
                <BaseDialog 
                header="Delete component" 
                text="Are you sure you want to remove the component?" 
                onHide={()=>setDeleteDialogVisible(false)}
                onSuccess={deleteHandler}
                />
            </DialogPortal>
        }
        </ContentBox>
    )
}
