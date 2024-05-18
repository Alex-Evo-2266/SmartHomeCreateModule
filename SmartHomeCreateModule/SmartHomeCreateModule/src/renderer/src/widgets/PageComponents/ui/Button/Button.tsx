import { IButton } from "@renderer/entites/module/models/pageComponents"
import { Button } from "alex-evo-sh-ui-kit"
import React from "react"

export interface ButtonComponentProps{
    data: IButton
}

export const ButtonComponent:React.FC<ButtonComponentProps> = ({data}) => {
    return <Button>{data.title}</Button>
}