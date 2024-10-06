import { ITextField } from "@renderer/entites/module/models/components"
import { EditTextComponentDialog } from "./EditDialogs/EditTextComponent"
import { BasePropsComponent } from "./types"
import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"

export const TextBox:React.FC<BasePropsComponent<ITextField>> = (props) => 
    <TemplateComponent {...props} editDialog={EditTextComponentDialog}/>
