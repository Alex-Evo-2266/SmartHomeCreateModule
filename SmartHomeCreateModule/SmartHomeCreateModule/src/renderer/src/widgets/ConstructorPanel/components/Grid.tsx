import { IGridLayout } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { MoreValueComponentTemplate } from "./Templates/MoreValueComponentTemplate"
import { EditGridComponentDialog } from "./EditDialogs/EditGridContainer"

export const GridBox:React.FC<BasePropsComponent<IGridLayout>> = (props) => 
    <MoreValueComponentTemplate {...props} editDialog={EditGridComponentDialog}/>
