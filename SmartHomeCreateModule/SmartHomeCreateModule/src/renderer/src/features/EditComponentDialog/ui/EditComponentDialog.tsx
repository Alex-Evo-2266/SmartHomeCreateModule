import { IComponents } from "@renderer/entites/module/models/pageModel"
import { TypeComponent } from "@renderer/entites/module/models/typeComponents"
import { EditTextComponentDialog } from "./EditTextComponent"
import { EditColumnComponentDialog } from "./EditColumnComponent"


export interface EditComponentDialogProps{
    data: IComponents
    onChange: (newData: IComponents)=>void
    onDelete: ()=>void
}

export const EditComponentDialog:React.FC<EditComponentDialogProps> = ({data, onChange, onDelete})=>{

    if(data.type === TypeComponent.TEXT)
        return <EditTextComponentDialog onDelete={onDelete} data={data} onChange={onChange}/>
    if(data.type === TypeComponent.COLUMNS)
        return <EditColumnComponentDialog onDelete={onDelete} data={data} onChange={onChange}/>
    return
}