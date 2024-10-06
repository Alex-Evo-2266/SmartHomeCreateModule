import { ICard } from "@renderer/entites/module/models/components"
import { BasePropsComponent } from "./types"
import { EditCardComponentDialog } from "./EditDialogs/EditCardComponent"
import { OneValueComponentTemplate } from "./Templates/OneValueComponentTemplate"

export const CardBox:React.FC<BasePropsComponent<ICard>> = (props) => 
    <OneValueComponentTemplate {...props} editDialog={EditCardComponentDialog}/>
