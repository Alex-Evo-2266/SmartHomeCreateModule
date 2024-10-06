import { ISwitch } from "@renderer/entites/module/models/components"
import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"
import { BasePropsComponent } from "./types"
import { EditSwitchComponentDialog } from "./EditDialogs/EditSwitchComponent"

export const SwitchBox:React.FC<BasePropsComponent<ISwitch>> = (props) => 
    <TemplateComponent {...props} editDialog={EditSwitchComponentDialog}/>
