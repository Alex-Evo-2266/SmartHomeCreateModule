import { IButton, ICard, IColumns, IComponents, IFlexContainer, IGridLayout, IList, ISelect, ISendText, ISlider, ISwitch, MoreValueComponent, OneValueComponent } from "@renderer/entites/module/models/components"
import { TypeComponent } from "alex-evo-web-constructor"

export type ActionComponent = ICard | IButton
export type FatchComponent = ISelect | ISendText | ISlider | ISwitch
export type GenerateContentTypes = IList | IGridLayout | IFlexContainer

export type SelectItens = (string | {
    label: string;
    data: string;
})[]

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
    TypeComponent.TABLE
]

const fetchComponentsType = [
    TypeComponent.SELECT,
    TypeComponent.SEND_TEXT,
    TypeComponent.SLIDER,
    TypeComponent.SWITCH,
]

const generateContentType = [
    TypeComponent.LIST,
    TypeComponent.GRID_LAYOUT,
    TypeComponent.FLEX_CONTAINER,
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

export function isGenerateContent(component:IComponents): component is (GenerateContentTypes){
    return generateContentType.includes(component.type)
}

export function splitItems(items: string){
    return items.split(',').map(item=>item.trim())
}

export function joinItems(items: SelectItens):string{
    if(items.length === 0)
        return ""
    if(items.length === 1){
        if(typeof items[0] !== 'string')
            return items[0].data
        return items[0]
    }
    return items.reduce((prev, curr):string=>{
        let prev2: string
        let curr2: string
        if(typeof prev !== 'string')
            prev2 = prev.data
        else
            prev2 = prev
        if(typeof curr !== 'string')
            curr2 = curr.data
        else
            curr2 = curr
        return [prev2, curr2].join(', ')
    }) as string
}
