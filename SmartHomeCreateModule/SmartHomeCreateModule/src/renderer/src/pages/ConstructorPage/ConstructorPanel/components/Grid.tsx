import { IGridLayout } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { MoreValueComponentTemplate } from "./Templates/MoreValueComponentTemplate"

export const GridBox:React.FC<BasePropsComponent<IGridLayout>> = (props) => 
    <MoreValueComponentTemplate {...props}/>
