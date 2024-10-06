import { ISendText } from "@renderer/entites/module/models/components"
import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"
import { BasePropsComponent } from "./types"
import { EditSendTextComponentDialog } from "./EditDialogs/EditSendTextComponent"

export const SendTextBox:React.FC<BasePropsComponent<ISendText>> = (props) => 
    <TemplateComponent {...props} editDialog={EditSendTextComponentDialog}/>
