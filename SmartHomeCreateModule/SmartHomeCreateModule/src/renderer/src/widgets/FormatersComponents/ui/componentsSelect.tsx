import { ListContainer, ListItem } from "alex-evo-sh-ui-kit"
import { TypeComponent } from "alex-evo-web-constructor"
import { useState } from "react"
import { TemplatePage } from "./templatePage"
import { FormaterComponentsDopProps, FormaterComponentsProps } from "../models/basePages"
import { TextComponentInfo } from "./components/text"
import { CardComponentInfo } from "./components/card"
import { UnknownComponentInfo } from "./components/unknown"
import { ListComponentInfo } from "./components/list"
import { ButtonComponentInfo } from "./components/button"
import { BoxComponentInfo } from "./components/boxContent"

export const FormaterComponentsComponentsPage:React.FC<FormaterComponentsProps> = ({onSetPage}) => {

    const [page, setPage] = useState<null | TypeComponent>(null)

    function prevpage(){
        onSetPage && onSetPage(null)
    }
    
    if(!page)
        return <FormaterComponentsComponentsSelectPage onSetPage={(data)=>setPage(data)} onPrevPage={prevpage}/>

    const components:{[key in TypeComponent]:React.FC<FormaterComponentsProps>} = {
        [TypeComponent.BUTTON]:ButtonComponentInfo,
        [TypeComponent.CARD]:CardComponentInfo,
        [TypeComponent.COLUMNS]:UnknownComponentInfo,
        [TypeComponent.CONTENT_BOX]:BoxComponentInfo,
        [TypeComponent.DIVIDER]:UnknownComponentInfo,
        [TypeComponent.FLEX_CONTAINER]:UnknownComponentInfo,
        [TypeComponent.GRID_LAYOUT]:UnknownComponentInfo,
        [TypeComponent.JSON]:UnknownComponentInfo,
        [TypeComponent.KEY_VALUE]:UnknownComponentInfo,
        [TypeComponent.LIST]:ListComponentInfo,
        [TypeComponent.PANEL]:UnknownComponentInfo,
        [TypeComponent.SELECT]:UnknownComponentInfo,
        [TypeComponent.SEND_TEXT]:UnknownComponentInfo,
        [TypeComponent.SLIDER]:UnknownComponentInfo,
        [TypeComponent.SWITCH]:UnknownComponentInfo,
        [TypeComponent.TABLE]:UnknownComponentInfo,
        [TypeComponent.TEXT]:TextComponentInfo,
    }

    const Component = components[page]
    
    return(
        <Component onSetPage={(data)=>setPage(data)}/>
    )
}

function FormaterComponentsComponentsSelectPage({onSetPage, onPrevPage}:FormaterComponentsDopProps) {

    const components = Object.values(TypeComponent)

    function click(data: TypeComponent) {
        onSetPage && onSetPage(data)
    }

    function prevpage(){
        onPrevPage && onPrevPage()
    }

    return (
        <TemplatePage onPrevPage={prevpage}>
            <ListContainer transparent>
                {
                    components.map(item=>(
                        <ListItem hovered header={item} key={item} onClick={()=>click(item)}/>
                    ))
                }
            </ListContainer>
        </TemplatePage>
                
        )
}