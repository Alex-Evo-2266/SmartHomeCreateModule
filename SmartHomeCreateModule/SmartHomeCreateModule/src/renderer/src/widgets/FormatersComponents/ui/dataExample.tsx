import { Typography } from "alex-evo-sh-ui-kit"
import MonacoEditor from "react-monaco-editor"
import { TemplatePage } from "./templatePage"
import { FormaterComponentsProps } from "../models/basePages"
import { options } from "../lib/helpers/optionEditor"
import { dataExample, dataExample2 } from "../lib/examples/data"

export const DataInfo:React.FC<FormaterComponentsProps> = ({onSetPage}) => {

    const prevPage = () => {
        onSetPage && onSetPage(null)
    }

    return(
        <TemplatePage onPrevPage={prevPage}>
            <div>
                <Typography type="title">Data</Typography>
                <Typography type="body">example</Typography>
                <MonacoEditor
                    height="150px"
                    language="python"
                    value={dataExample}
                    options={{...options, readOnly: true}}
                />
                <Typography type="body">example2</Typography>
                <MonacoEditor
                    height="150px"
                    language="python"
                    value={dataExample2}
                    options={{...options, readOnly: true}}
                />
            </div>
        </TemplatePage>
    )
}