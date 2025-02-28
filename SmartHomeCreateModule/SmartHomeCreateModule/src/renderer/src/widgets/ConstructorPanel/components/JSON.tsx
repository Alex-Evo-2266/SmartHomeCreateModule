import { IJSON } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"
import { EditJSONComponentDialog } from "./EditDialogs/EditJSONComponent"

export const JSON:React.FC<BasePropsComponent<IJSON>> = (props) => 
    <TemplateComponent {...props} editDialog={EditJSONComponentDialog}/>
