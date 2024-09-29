import { AppWindowMac, MousePointerClick, Type, X } from "lucide-react"
import { ComponentItem } from "../../models/module";
import { TypeAPI } from "../../models/types";

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
        title: "Card control action",
        icon: <MousePointerClick/>,
        data: TypeAPI.CARD_CONTROL_ACTION
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