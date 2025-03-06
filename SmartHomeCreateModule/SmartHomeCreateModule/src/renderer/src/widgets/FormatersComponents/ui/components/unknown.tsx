import { Typography } from "alex-evo-sh-ui-kit"
import { FormaterComponentsProps } from "../../models/basePages"
import { TemplatePage } from "../templatePage"

export const UnknownComponentInfo:React.FC<FormaterComponentsProps> = ({onSetPage}) => {

    const prevPage = () => {
        onSetPage && onSetPage(null)
    }

    return(
        <TemplatePage onPrevPage={prevPage}>
            <div>
                <Typography type="title">Unknown</Typography>
            </div>
        </TemplatePage>
    )
}