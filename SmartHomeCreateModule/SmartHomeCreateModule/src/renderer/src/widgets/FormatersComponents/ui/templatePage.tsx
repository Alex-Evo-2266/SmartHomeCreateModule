import { ArrowLeft, IconButton } from "alex-evo-sh-ui-kit"

export interface TemplatePageProps {
    children: React.ReactNode
    onPrevPage: ()=>void
}

export const TemplatePage:React.FC<TemplatePageProps> = ({children, onPrevPage}) => {

    return(
        <div>
            <div>
                <IconButton icon={<ArrowLeft/>} onClick={onPrevPage}/>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}