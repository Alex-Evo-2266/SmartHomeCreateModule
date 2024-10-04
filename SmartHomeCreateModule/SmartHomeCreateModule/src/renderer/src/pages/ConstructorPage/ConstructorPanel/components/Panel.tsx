import { IPanel } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { OneValueComponentTemplate } from "./Templates/OneValueComponentTemplate"

export const PanelBox:React.FC<BasePropsComponent<IPanel>> = (props) => 
    <OneValueComponentTemplate {...props}/>
