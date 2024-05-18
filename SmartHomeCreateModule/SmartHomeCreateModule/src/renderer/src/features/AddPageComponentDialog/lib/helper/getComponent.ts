import { TypeContent } from "@renderer/entites/module/models/pageComponents"
import { IComponents } from "@renderer/entites/module/models/pageModel"
import { TypeComponent } from "@renderer/entites/module/models/typeComponents"

export function getInitComponent(type:TypeComponent):IComponents{
    if(type === TypeComponent.TEXT)
        return {
            type:TypeComponent.TEXT,
            type_content: TypeContent.TEXT,
            value: "information"
            
        }
    if(type === TypeComponent.COLUMNS)
        return {
            type: TypeComponent.COLUMNS,
            count: 2,
            value: []
        }
    if(type === TypeComponent.CARD)
        return {
            type: TypeComponent.CARD,
            type_content: TypeContent.TEXT,
            text: "",
            title: "",
            buttons: []
        }
    if(type === TypeComponent.BUTTON)
        return {
            type: TypeComponent.BUTTON,
            title: "btn",
            action_url: ""
        }
    return {
        type:TypeComponent.TEXT,
        type_content: TypeContent.TEXT,
        value: "information"
    }
} 