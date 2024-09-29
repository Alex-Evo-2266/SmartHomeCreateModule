import { TypeAPI } from "../../models/types"
import { TypeComponent } from "alex-evo-web-constructor"
import { ComponentItem } from "../../models/module"
import { URL_ITEM } from "../consts/api"
import { COMPONENTS } from "../consts/componenys"

export function getComponentItem(type:TypeComponent):ComponentItem<TypeComponent> | undefined{
    return COMPONENTS.find(item=>item.data === type)
}

export function getAPIItem(type:TypeAPI):ComponentItem<TypeAPI> | undefined{
    return URL_ITEM.find(item=>item.data === type)
}