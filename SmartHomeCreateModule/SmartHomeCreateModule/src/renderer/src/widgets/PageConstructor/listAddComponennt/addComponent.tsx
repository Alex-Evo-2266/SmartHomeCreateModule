import { COUNT_VALUE } from "@renderer/entites/module/lib/consts/componenys"
import { CountComponent } from "@renderer/entites/module/models/module"
import { TypeComponent } from "alex-evo-web-constructor"
import { ColumnList } from "./collumn"
import { IColumns } from "alex-evo-web-constructor"
import { IComponents, Src } from "@renderer/entites/module/models/pageModel"

interface ColumnListProps{
    component: IComponents
    onChange: (data: IComponents) => void
}

export const AddComponent:React.FC<ColumnListProps> = ({component, onChange}) => {

    const countChildren = COUNT_VALUE[component.type]

    if(countChildren === CountComponent.COLUMN && component.type === TypeComponent.COLUMNS)
    {
        return(<ColumnList component={component as IColumns & {src: Src}} onChange={onChange}/>)
    }

    return(
        <></>
    )
}