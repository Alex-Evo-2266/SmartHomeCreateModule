import { ActionType, ControlType, IComponents, TypeContent } from "@renderer/entites/module/models/pageModels/pageModel"
import { TypeComponent } from "@renderer/entites/module/models/types"

export function getInitComponent(type:TypeComponent):IComponents{
    if(type === TypeComponent.TEXT)
        return {
            type:TypeComponent.TEXT,
            content_type: TypeContent.MANUAL,
            title: "information",
            name: "text_fiald"
        }
    if(type === TypeComponent.COLUMNS)
        return {
            type: TypeComponent.COLUMNS,
            count: 2,
            value: [],
            title: "collumn",
            name: "collumn"
        }
    if(type === TypeComponent.CARD)
        return {
            type: TypeComponent.CARD,
            content_type: TypeContent.MANUAL,
            text: "",
            name: "card",
            title: "",
            action_type: ActionType.NONE,
        }
    if(type === TypeComponent.CARD_CONTROL)
        return {
            type: TypeComponent.CARD_CONTROL,
            content_type: TypeContent.MANUAL,
            text: "",
            name: "card_control",
            title: "",
            action_type: ActionType.NONE,
            control_type: ControlType.MANUAL,
            control_target: "",
            control: []
        }
    if(type === TypeComponent.BUTTON)
        return {
            type: TypeComponent.BUTTON,
            title: "btn",
            name: "button",
            action_type: ActionType.GET_REQUEST,
            action_target: ""
        }
    return {
        type:TypeComponent.TEXT,
        content_type: TypeContent.MANUAL,
        title: "information",
        name: "undefined_component"
    }
} 