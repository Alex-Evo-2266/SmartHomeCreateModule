import { IComponents } from "@renderer/entites/module/models/pageModel"
import { TypeComponent } from "alex-evo-web-constructor"
import { ColumnsEdit } from "./columnEdit"
import { DialogPortal } from "@renderer/shared/ui"
import { useMemo } from "react"

interface ComponentEditEditProps{
    onHide: ()=>void,
    onSave: (data: any)=>void,
    data: IComponents
}

const Dialogs = {
    [TypeComponent.COLUMNS]: ColumnsEdit
}

export const ComponentEdit:React.FC<ComponentEditEditProps> = ({data, onHide, onSave}) => {

    const Component = useMemo(()=>Dialogs[data.type]??<></>,[data]) 

    return(
        <DialogPortal>
            <Component onHide={onHide} onSave={onSave} data={data}/>
        </DialogPortal>
    )
}