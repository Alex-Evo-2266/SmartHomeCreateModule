import { IComponents } from "@renderer/entites/module/models/pageModels/pageModel"
import { TypeComponent } from "@renderer/entites/module/models/types"
import { EditTextComponentDialog } from "./EditTextComponent"
import { EditColumnComponentDialog } from "./EditColumnComponent"
import { EditButtonComponentDialog } from "./EditButtonComponent"
import { EditCardComponentDialog } from "./EditCardComponent"
import { EditCardControlComponentDialog } from "./EditCardControlComponent"


export interface EditComponentDialogProps{
    data: IComponents
    onChange: (newData: IComponents)=>void
    onDelete: ()=>void
    onHide:()=>void
}

export const EditComponentDialog:React.FC<EditComponentDialogProps> = ({data, onChange, onDelete, onHide})=>{

    return(
        <>
        {
            (data.type === TypeComponent.TEXT)?
            <EditTextComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>:
            (data.type === TypeComponent.COLUMNS)?
            <EditColumnComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>:
            (data.type === TypeComponent.BUTTON)?
            <EditButtonComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>:
            (data.type === TypeComponent.CARD)?
            <EditCardComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>:
            (data.type === TypeComponent.CARD_CONTROL)?
            <EditCardControlComponentDialog onDelete={onDelete} data={data} onChange={onChange} onHide={onHide}/>:
            JSON.stringify(data)
        }
        </>
    )
}