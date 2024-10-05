import { IComponents, TypeSrc } from "@renderer/entites/module/models/components"
import { ActionType, TypeComponent } from "alex-evo-web-constructor"

export function getInitComponent(type:TypeComponent, src: TypeSrc = TypeSrc.MANUAL):IComponents{
    if(type === TypeComponent.TEXT)
        return {
            type:TypeComponent.TEXT,
            value: "information",
            name: "text_fiald"
        }
    if(type === TypeComponent.COLUMNS)
        return {
            type: TypeComponent.COLUMNS,
            count: 2,
            value: [],
            name: "collumn"
        }
    if(type === TypeComponent.CARD)
        return {
            type: TypeComponent.CARD,
            name: "card",
            label: "",
            action: {
                action_type: ActionType.NONE
            },
        }
    if(type === TypeComponent.BUTTON)
        return {
            type: TypeComponent.BUTTON,
            label: "btn",
            name: "button",
            action: {
                action_type: ActionType.NONE
            },
        }
    if(type === TypeComponent.DIVIDER)
        return {
            type: TypeComponent.DIVIDER,
            name: "button"
        }
    if(type === TypeComponent.FLEX_CONTAINER)
        return {
            type: TypeComponent.FLEX_CONTAINER,
            name: "button",
            value:[],
            src: src
        }
    if(type === TypeComponent.GRID_LAYOUT)
        return {
            type: TypeComponent.GRID_LAYOUT,
            name: "button",
            value:[],
            src: src
        }
    if(type === TypeComponent.KEY_VALUE)
        return {
            type: TypeComponent.KEY_VALUE,
            name: "button",
            label: "key",
        }
    if(type === TypeComponent.LIST)
        return {
            type: TypeComponent.LIST,
            name: "button",
            value:[],
            src: src
        }
    if(type === TypeComponent.PANEL)
        return {
            type: TypeComponent.PANEL,
            name: "button",
        }
    if(type === TypeComponent.SELECT)
        return {
            type: TypeComponent.SELECT,
            name: "button",
            action:{ action_type: ActionType.GET_REQUEST, action_target: "/test"},
            items: [],
            value: "",
        }
    if(type === TypeComponent.SEND_TEXT)
        return {
            type: TypeComponent.SEND_TEXT,
            name: "button",
            action:{ action_type: ActionType.GET_REQUEST, action_target: "/test"},
            value: "",
        }
    if(type === TypeComponent.SLIDER)
        return {
            type: TypeComponent.SLIDER,
            name: "button",
            action:{ action_type: ActionType.GET_REQUEST, action_target: "/test"},
            value: 4,
        }
    if(type === TypeComponent.SWITCH)
        return {
            type: TypeComponent.SWITCH,
            name: "button",
            action:{ action_type: ActionType.GET_REQUEST, action_target: "/test"},
            value: true,
        }
    if(type === TypeComponent.TABLE)
        return {
            type: TypeComponent.TABLE,
            name: "table",
            action:{ action_type: ActionType.NONE },
            cols:[],
            row:[],
            src: src
        }
    return {
        type:TypeComponent.TEXT,
        value: "information",
        name: "undefined_component",
    }
} 