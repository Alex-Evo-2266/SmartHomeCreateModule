import { IList } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { MoreValueComponentTemplate } from "./Templates/MoreValueComponentTemplate"
import { EditListComponentDialog } from "./EditDialogs/EditListContainer"

export const ListBox:React.FC<BasePropsComponent<IList>> = (props) => 
    <MoreValueComponentTemplate {...props} editDialog={EditListComponentDialog}/>
