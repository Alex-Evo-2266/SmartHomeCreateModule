import { ISlider } from "@renderer/entites/module/models/components"
import { TemplateComponent } from "./Templates/BaseItemComponentTemplate"
import { BasePropsComponent } from "./types"
import { EditSliderComponentDialog } from "./EditDialogs/EditSliderComponent"

export const SliderBox:React.FC<BasePropsComponent<ISlider>> = (props) => 
    <TemplateComponent {...props} editDialog={EditSliderComponentDialog}/>
