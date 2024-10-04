import { IButton, ICard, IColumns, IComponents, ISelect, ISendText, ISlider, ISwitch, MoreValueComponent, OneValueComponent } from "@renderer/entites/module/models/components"
import { TypeComponent } from "alex-evo-web-constructor"

export type ActionComponent = ICard | IButton
export type FatchComponent = ISelect | ISendText | ISlider | ISwitch

const containersOneComponentType = [
    TypeComponent.KEY_VALUE, 
    TypeComponent.PANEL,
    TypeComponent.CARD
]

const containersMoreComponentType = [
    TypeComponent.FLEX_CONTAINER, 
    TypeComponent.GRID_LAYOUT, 
    TypeComponent.LIST
]

const containersColumnComponentType = [
    TypeComponent.COLUMNS
]

const actionComponentsType = [
    TypeComponent.BUTTON,
    TypeComponent.CARD,
]

const fetchComponentsType = [
    TypeComponent.SELECT,
    TypeComponent.SEND_TEXT,
    TypeComponent.SLIDER,
    TypeComponent.SWITCH,
]

export function isContainerOneComponents(component:IComponents): component is (OneValueComponent){
    return containersOneComponentType.includes(component.type)
}

export function isContainerMoreComponents(component:IComponents): component is (MoreValueComponent){
    return containersMoreComponentType.includes(component.type)
}

export function isContainerColumn(component:IComponents): component is (IColumns){
    return containersColumnComponentType.includes(component.type)
}


export function isAction(component:IComponents): component is (ActionComponent){
    return actionComponentsType.includes(component.type)
}

export function isFetch(component:IComponents): component is (FatchComponent){
    return fetchComponentsType.includes(component.type)
}