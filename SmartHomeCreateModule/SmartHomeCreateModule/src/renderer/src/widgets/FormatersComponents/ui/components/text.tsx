import { Typography } from "alex-evo-sh-ui-kit"
import { FormaterComponentsProps } from "../../models/basePages"
import { TemplatePage } from "../templatePage"
import MonacoEditor from "react-monaco-editor"
import { options } from "../../lib/helpers/optionEditor"
import { textExample } from "../../lib/examples/text"

export const TextComponentInfo:React.FC<FormaterComponentsProps> = ({onSetPage}) => {

    const prevPage = () => {
        onSetPage && onSetPage(null)
    }

    return(
        <TemplatePage onPrevPage={prevPage}>
            <div>
                <Typography type="title">Text</Typography>
                <Typography type="body">example</Typography>
                <MonacoEditor
                    height="150px"
                    language="python"
                    value={textExample}
                    options={{...options, readOnly: true}}
                />
            </div>
        </TemplatePage>
    )
}