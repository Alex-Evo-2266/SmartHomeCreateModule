import { ICard } from "@renderer/entites/module/models/pageComponents"
import { BaseActionCard, Button, Card } from "alex-evo-sh-ui-kit"
import React from "react"

export interface CardComponentProps{
    data: ICard
    onClick: (e:React.MouseEvent<HTMLDivElement>)=>void
}

export const CardComponent:React.FC<CardComponentProps> = ({data, onClick}) => {
    return <Card onClick={onClick} className="constructor-component" header={data.title} text={data.text}>
        {
            (data.buttons)?
            <BaseActionCard>
            {
                data.buttons.map((item, index)=>(
                    <Button key={index}>{item.title}</Button>
                ))
            }
            </BaseActionCard>:
            null
        }
    </Card>
}