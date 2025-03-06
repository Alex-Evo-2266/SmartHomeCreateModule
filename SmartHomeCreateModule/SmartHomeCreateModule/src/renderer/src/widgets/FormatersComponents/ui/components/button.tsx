import { Typography } from "alex-evo-sh-ui-kit"
import { FormaterComponentsProps } from "../../models/basePages"
import { TemplatePage } from "../templatePage"
import MonacoEditor from "react-monaco-editor"
import { options } from "../../lib/helpers/optionEditor"
import { buttonExample } from "../../lib/examples/button"

export const ButtonComponentInfo:React.FC<FormaterComponentsProps> = ({onSetPage}) => {

    const prevPage = () => {
        onSetPage && onSetPage(null)
    }

    return(
        <TemplatePage onPrevPage={prevPage}>
            <div>
                <Typography type="title">Button</Typography>
                <Typography type="body">example</Typography>
                <MonacoEditor
                    height="150px"
                    language="python"
                    value={buttonExample}
                    options={{...options, readOnly: true}}
                />
            </div>
        </TemplatePage>
    )
}