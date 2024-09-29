import { TypeComponent } from "alex-evo-web-constructor";
import { AppWindowMac, MousePointerClick, Tally4, Type } from "lucide-react";
import { ComponentItem, CountComponent } from "../../models/module";


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
        title: "divider",
        icon: <Tally4/>,
        data: TypeComponent.DIVIDER
    },
    {
        title: "flex container",
        icon: <Tally4/>,
        data: TypeComponent.FLEX_CONTAINER
    },
    {
        title: "grid layout",
        icon: <Tally4/>,
        data: TypeComponent.GRID_LAYOUT
    },
    {
        title: "key value",
        icon: <Tally4/>,
        data: TypeComponent.KEY_VALUE
    },
    {
        title: "list",
        icon: <Tally4/>,
        data: TypeComponent.LIST
    },
    {
        title: "panel",
        icon: <Tally4/>,
        data: TypeComponent.PANEL
    },
    {
        title: "select",
        icon: <Tally4/>,
        data: TypeComponent.SELECT
    },
    {
        title: "slider",
        icon: <Tally4/>,
        data: TypeComponent.SLIDER
    },
    {
        title: "send",
        icon: <Tally4/>,
        data: TypeComponent.SEND_TEXT
    },
    {
        title: "switch",
        icon: <Tally4/>,
        data: TypeComponent.SWITCH
    },
    {
        title: "table",
        icon: <Tally4/>,
        data: TypeComponent.TABLE
    },
    {
        title: "Button",
        icon: <MousePointerClick/>,
        data: TypeComponent.BUTTON
    },
]

export const COUNT_VALUE = {
    [TypeComponent.BUTTON]: CountComponent.NONE,
    [TypeComponent.CARD]: CountComponent.ONE,
    [TypeComponent.COLUMNS]: CountComponent.COLUMN,
    [TypeComponent.DIVIDER]: CountComponent.NONE,
    [TypeComponent.FLEX_CONTAINER]: CountComponent.MORE,
    [TypeComponent.GRID_LAYOUT]: CountComponent.MORE,
    [TypeComponent.KEY_VALUE]: CountComponent.ONE,
    [TypeComponent.LIST]: CountComponent.MORE,
    [TypeComponent.PANEL]: CountComponent.ONE,
    [TypeComponent.SELECT]: CountComponent.NONE,
    [TypeComponent.SEND_TEXT]: CountComponent.NONE,
    [TypeComponent.SLIDER]: CountComponent.NONE,
    [TypeComponent.SWITCH]: CountComponent.NONE,
    [TypeComponent.TEXT]: CountComponent.NONE,
    [TypeComponent.TABLE]: CountComponent.TABLE
}