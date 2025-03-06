import { FullScrinTemplateDialog } from "alex-evo-sh-ui-kit"
import { useState } from "react"
import { FormaterComponentsBasePage } from "./InformationBasePage"
import { BasePages } from "../models/basePages"
import { FormaterComponentsComponentsPage } from "./componentsSelect"
import { DataInfo } from "./dataExample"
import { ActionInfo } from "./actionPage"


interface FormaterComponentsProps{
    onHide:()=>void
}

export const FormaterComponents:React.FC<FormaterComponentsProps> = ({onHide}) => {

    const [page, setPage] = useState<null | BasePages>(null)

    const components:{[key in BasePages]: React.FC} = {
        [BasePages.COMPONENTS]: FormaterComponentsComponentsPage,
        [BasePages.DATA]: DataInfo,
        [BasePages.ACTION]: ActionInfo
    }

    const Component = (page)? components[page]: FormaterComponentsBasePage

    const pageClick = (data:any) => {
        console.log(data)
        setPage(data)
    }   

    return(
        <FullScrinTemplateDialog onHide={onHide} header="Formater components">
            <Component onSetPage={pageClick}/>
        </FullScrinTemplateDialog>
    )
}