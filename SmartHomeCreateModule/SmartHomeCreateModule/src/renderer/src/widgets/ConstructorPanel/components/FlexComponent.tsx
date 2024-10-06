import { IFlexContainer } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { MoreValueComponentTemplate } from "./Templates/MoreValueComponentTemplate"
import { EditFlexComponentDialog } from "./EditDialogs/EditFlexContainer"

export const FlexBox:React.FC<BasePropsComponent<IFlexContainer>> = (props) => 
    <MoreValueComponentTemplate {...props} editDialog={EditFlexComponentDialog}/>
