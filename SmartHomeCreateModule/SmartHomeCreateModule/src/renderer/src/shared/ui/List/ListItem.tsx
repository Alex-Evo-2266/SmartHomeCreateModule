import "./List.scss"

interface ListItemContainerProps{
    icon?: React.ReactNode
    header?: string
    text?: string
    control?: React.ReactNode
    value?: string
    onClick?: (e:React.MouseEvent<HTMLLIElement>)=>void
    hovered?: boolean
    className?: string
}

export const ListItem = ({icon, control, text, header, value, onClick, hovered, className}:ListItemContainerProps) => {

    const click = (event: React.MouseEvent<HTMLLIElement>) => {
        if(!(event.target as HTMLElement).closest(".control-container"))
            onClick && onClick(event)
    }

    return(
        <li className={`${className} list-item-container ${hovered?"hovered":""}`} onClick={click}>
            {
                (icon)?
                <div className="icon-container">
                {icon}
                </div>:
                (value)?
                <div className="icon-container">
                {value}
                </div>:null
            }
            {
                (text)?
                <div className="text-container">
                    <div className="header">{header}</div>
                    <div className="text">{text}</div>
                </div>:
                <div className="text-container">
                    <div className="header">{header}</div>
                </div>
            }
            {
                (control)?
                <div className="control-container">
                    {control}
                </div>:null
            }
        </li>
    )
}