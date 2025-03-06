import { ListContainer, ListItem } from "alex-evo-sh-ui-kit"
import { BasePages, BasePagesSelect, FormaterComponentsProps } from "../models/basePages"

export const FormaterComponentsBasePage:React.FC<FormaterComponentsProps> = ({onSetPage}) => {

    const click = (data: BasePages) => {
        onSetPage && onSetPage(data)
    }

    return(
            <ListContainer transparent>
            {
                BasePagesSelect.map(item=>(
                    <ListItem hovered header={item.title} key={item.data} onClick={()=>click(item.data)}/>
                ))
            }
            </ListContainer>
    )
}