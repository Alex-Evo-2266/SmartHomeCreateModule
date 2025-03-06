import { Typography } from "alex-evo-sh-ui-kit"
import MonacoEditor from "react-monaco-editor"
import { TemplatePage } from "./templatePage"
import { FormaterComponentsProps } from "../models/basePages"
import { options } from "../lib/helpers/optionEditor"
import { actionExample } from "../lib/examples/action"

export const ActionInfo:React.FC<FormaterComponentsProps> = ({onSetPage}) => {

    const prevPage = () => {
        onSetPage && onSetPage(null)
    }

    return(
        <TemplatePage onPrevPage={prevPage}>
            <div>
                <Typography type="title">Action</Typography>
                <Typography type="body">example</Typography>
                <MonacoEditor
                    height="150px"
                    language="python"
                    value={actionExample}
                    options={{...options, readOnly: true}}
                />
            </div>
        </TemplatePage>
    )
}