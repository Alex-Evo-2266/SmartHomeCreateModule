import { IDivider } from "@renderer/entites/module/models/components"
import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"
import { BasePropsComponent } from "./types"
import { EditDividerComponentDialog } from "./EditDialogs/EditDividerComponent"

export const DividerBox:React.FC<BasePropsComponent<IDivider>> = (props) => 
    <TemplateComponent {...props} editDialog={EditDividerComponentDialog}/>
