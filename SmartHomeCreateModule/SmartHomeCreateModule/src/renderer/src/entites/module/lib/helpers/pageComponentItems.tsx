import { AppWindowMac, MousePointerClick, Tally4, Type, X } from "lucide-react"
import { TypeComponent, TypeAPI } from "../../models/types"
import React from "react"

export interface ComponentItem<T> {
    title: string
    icon: React.ReactNode
    data: T
}

export const COMPONENTS:ComponentItem<TypeComponent>[] = [
    {
        title: "collumn",
        icon: <Tally4/>,
        data: TypeComponent.COLUMNS
    },
    {
        title: "text",
        icon: <Type/>,
        data: TypeComponent.TEXT
    },
    {
        title: "Card",
        icon: <AppWindowMac/>,
        data: TypeComponent.CARD
    },
    {
        title: "Card control",
        icon: <AppWindowMac/>,
        data: TypeComponent.CARD_CONTROL
    },
    {
        title: "Button",
        icon: <MousePointerClick/>,
        data: TypeComponent.BUTTON
    },
]

export function getComponentItem(type:TypeComponent):ComponentItem<TypeComponent> | undefined{
    return COMPONENTS.find(item=>item.data === type)
}

export const URL_ITEM:ComponentItem<TypeAPI>[] = [
    {
        title: "text",
        icon: <Type/>,
        data: TypeAPI.TEXT
    },
    {
        title: "Card",
        icon: <AppWindowMac/>,
        data: TypeAPI.CARD
    },
    {
        title: "Card control",
        icon: <AppWindowMac/>,
        data: TypeAPI.CARD_CONTROL
    },
    {
        title: "Action",
        icon: <MousePointerClick/>,
        data: TypeAPI.ACTION
    },
    {
        title: "",
        icon: <X/>,
        data: TypeAPI.UNDEFINED
    }
]

export function getAPIItem(type:TypeAPI):ComponentItem<TypeAPI> | undefined{
    return URL_ITEM.find(item=>item.data === type)
}