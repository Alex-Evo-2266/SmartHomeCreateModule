import { IBlock, Menu } from "alex-evo-sh-ui-kit"

export interface MenuProps{
    blocks: IBlock[]
    constainer: HTMLDivElement
}

export const MenuPreview = ({blocks, constainer}:MenuProps) => {

    if(constainer)
        return (
            <Menu x={200} y={200} blocks={blocks} visible container={constainer} />
        )
    return <p>test</p>
}