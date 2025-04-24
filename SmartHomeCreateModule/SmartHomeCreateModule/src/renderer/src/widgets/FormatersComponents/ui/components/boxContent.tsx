import { Typography } from "alex-evo-sh-ui-kit"
import { FormaterComponentsProps } from "../../models/basePages"
import { TemplatePage } from "../templatePage"
import MonacoEditor from "react-monaco-editor"
import { options } from "../../lib/helpers/optionEditor"
import { contentBoxExample } from "../../lib/examples/contentBox"

export const BoxComponentInfo:React.FC<FormaterComponentsProps> = ({onSetPage}) => {

    const prevPage = () => {
        onSetPage && onSetPage(null)
    }

    return(
        <TemplatePage onPrevPage={prevPage}>
            <div>
                <Typography type="title">Content box</Typography>
                <Typography type="body">example</Typography>
                <MonacoEditor
                    height="150px"
                    language="python"
                    value={contentBoxExample}
                    options={{...options, readOnly: true}}
                />
            </div>
        </TemplatePage>
    )
}