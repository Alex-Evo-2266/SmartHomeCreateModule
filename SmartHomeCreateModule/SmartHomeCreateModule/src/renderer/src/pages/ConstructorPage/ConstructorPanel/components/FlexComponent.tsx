import { IFlexContainer } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { MoreValueComponentTemplate } from "./Templates/MoreValueComponentTemplate"

export const FlexBox:React.FC<BasePropsComponent<IFlexContainer>> = (props) => 
    <MoreValueComponentTemplate {...props}/>
