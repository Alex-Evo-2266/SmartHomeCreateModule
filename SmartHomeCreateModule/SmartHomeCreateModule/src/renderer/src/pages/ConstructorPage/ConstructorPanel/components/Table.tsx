import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"
import { BasePropsComponent } from "./types"
import { EditTableComponentDialog } from "./EditDialogs/EditTableBox"
import { ITable } from "@renderer/entites/module/models/table"

export const TableBox:React.FC<BasePropsComponent<ITable>> = (props) => 
    <TemplateComponent {...props} editDialog={EditTableComponentDialog}/>
