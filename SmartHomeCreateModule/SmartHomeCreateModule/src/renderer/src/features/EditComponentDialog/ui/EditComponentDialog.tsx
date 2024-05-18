import { IComponents } from "@renderer/entites/module/models/pageModel"
import { TypeComponent } from "@renderer/entites/module/models/typeComponents"
import { EditTextComponentDialog } from "./EditTextComponent"
import { EditColumnComponentDialog } from "./EditColumnComponent"
import { EditButtonComponentDialog } from "./EditButtonComponent"
import { EditCardComponentDialog } from "./EditCardComponent"


export interface EditComponentDialogProps{
    data: IComponents
    onChange: (newData: IComponents)=>void
    onDelete: ()=>void
    onHide:()=>void
}

export const EditComponentDialog:React.FC<EditComponentDialogProps> = ({data, onChange, onDelete, onHide})=>{

    if(data.type === TypeComponent.TEXT)
        return <EditTextComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>
    if(data.type === TypeComponent.COLUMNS)
        return <EditColumnComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>
    if(data.type === TypeComponent.BUTTON)
        return <EditButtonComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>
    if(data.type === TypeComponent.CARD)
        return <EditCardComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>
    return JSON.stringify(data)
}