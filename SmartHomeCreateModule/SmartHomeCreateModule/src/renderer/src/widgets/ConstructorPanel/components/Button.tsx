import { IButton } from "@renderer/entites/module/models/components"
import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"
import { BasePropsComponent } from "./types"
import { EditButtonComponentDialog } from "./EditDialogs/EditButtonComponent"

export const ButtonBox:React.FC<BasePropsComponent<IButton>> = (props) => 
    <TemplateComponent {...props} editDialog={EditButtonComponentDialog}/>
