import { MousePointerClick, X } from "lucide-react"
import { ComponentItem } from "../../models/module";
import { TypeAPI } from "../../models/types";

export const URL_ITEM:ComponentItem<TypeAPI>[] = [
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