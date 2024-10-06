import { IKeyValue } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { OneValueComponentTemplate } from "./Templates/OneValueComponentTemplate"
import { EditKeyValueComponentDialog } from "./EditDialogs/EditKeyValueComponent"

export const KeyValueBox:React.FC<BasePropsComponent<IKeyValue>> = (props) => 
    <OneValueComponentTemplate {...props} editDialog={EditKeyValueComponentDialog}/>
