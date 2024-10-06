import { IDialog as ConstructorDialog } from "@renderer/entites/module/models/pageModel";
import { IDialog } from "alex-evo-web-constructor";
import { mapComponent } from "./mapComponents";

export function mapDialog(data:ConstructorDialog):IDialog{
    return {...data, components: data.components?[mapComponent(data.components)]:[]}
}