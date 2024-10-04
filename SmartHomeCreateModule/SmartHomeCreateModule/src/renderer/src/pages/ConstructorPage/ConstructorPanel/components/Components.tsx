import { TypeComponent } from "alex-evo-web-constructor"
import { ColumnBox } from "./Columns"
import { IComponents } from "@renderer/entites/module/models/components"
import { TextBox } from "./Text"
import { BasePropsComponent } from "./types"
import { CardBox } from "./Card"
import { ButtonBox } from "./Button"
import { DividerBox } from "./Divider"
import { FlexBox } from "./FlexComponent"
import { GridBox } from "./Grid"
import { KeyValueBox } from "./KeyValue"
import { ListBox } from "./List"
import { PanelBox } from "./Panel"

export const ComponentBox = ({component, onChange, onDelete}:BasePropsComponent<IComponents>) => {

    const Componsnts:{[key in TypeComponent]:React.FC<BasePropsComponent<any>>} = {
        [TypeComponent.COLUMNS]: ColumnBox,
        [TypeComponent.TEXT]: TextBox,
        [TypeComponent.BUTTON]: ButtonBox,
        [TypeComponent.CARD]: CardBox,
        [TypeComponent.DIVIDER]: DividerBox,
        [TypeComponent.FLEX_CONTAINER]: FlexBox,
        [TypeComponent.GRID_LAYOUT]: GridBox,
        [TypeComponent.KEY_VALUE]: KeyValueBox,
        [TypeComponent.LIST]: ListBox,
        [TypeComponent.PANEL]: PanelBox,
        [TypeComponent.SELECT]: TextBox,
        [TypeComponent.SEND_TEXT]: TextBox,
        [TypeComponent.SLIDER]: TextBox,
        [TypeComponent.SWITCH]: TextBox,
        [TypeComponent.TABLE]: TextBox
    }

    const Component = Componsnts[component.type]

    return <Component {...{component, onChange, onDelete}}/>
}
