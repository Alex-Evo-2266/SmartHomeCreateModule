import { IList } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { MoreValueComponentTemplate } from "./Templates/MoreValueComponentTemplate"

export const ListBox:React.FC<BasePropsComponent<IList>> = (props) => 
    <MoreValueComponentTemplate {...props}/>
