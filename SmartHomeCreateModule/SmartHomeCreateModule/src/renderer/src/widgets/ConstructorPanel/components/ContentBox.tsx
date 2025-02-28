import { IContentBox } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { OneValueComponentTemplate } from "./Templates/OneValueComponentTemplate"
import { EditContentBoxComponentDialog } from "./EditDialogs/EditComponentBox"

export const ContentBox:React.FC<BasePropsComponent<IContentBox>> = (props) => 
    <OneValueComponentTemplate {...props} editDialog={EditContentBoxComponentDialog}/>
