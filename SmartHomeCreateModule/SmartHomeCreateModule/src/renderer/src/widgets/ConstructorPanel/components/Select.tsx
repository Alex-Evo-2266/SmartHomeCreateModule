import { ISelect } from "@renderer/entites/module/models/components"
import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"
import { BasePropsComponent } from "./types"
import { EditSelectComponentDialog } from "./EditDialogs/EditSelectComponent"

export const SelectBox:React.FC<BasePropsComponent<ISelect>> = (props) => 
    <TemplateComponent {...props} editDialog={EditSelectComponentDialog}/>
