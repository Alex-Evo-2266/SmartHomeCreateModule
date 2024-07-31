import { useURL } from "@renderer/entites/Url"
import { ICardControl, TypeContent } from "@renderer/entites/module/models/pageModels/pageModel"
import { Card } from "alex-evo-sh-ui-kit"
import React from "react"

export interface CardComponentProps{
    data: ICardControl
    onClick: (e:React.MouseEvent<HTMLDivElement>)=>void
}

export const CardControlComponent:React.FC<CardComponentProps> = ({data, onClick}) => {

    const {getFullURL} = useURL()
    const fullUrl = getFullURL(data.content_target || "")

    if(data.content_type === TypeContent.LOAD)
        return <Card onClick={onClick} className="constructor-component" header={`(${fullUrl}).title_c`} text={`(${fullUrl}).text`}/>
    return <Card onClick={onClick} className="constructor-component" header={data.title} text={data.text}/>
}