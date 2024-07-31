import { JsonContainer } from "alex-evo-sh-ui-kit"

interface APICardPreviewProps{
    url: string
}

export const APICardPreview = ({url}:APICardPreviewProps) => {
    return(
        <>
        <JsonContainer onChange={()=>{}} readonly name={`url ${url} return object `} data={{
            header: "string",
            text: "string",
            control: {
                value: "string",
                systemName: "string",
                field: "string"
            },
            list:{
                title: "string",
                text: "string"
            }
        }}/>
        <p></p>
        <JsonContainer onChange={()=>{}} readonly name={`url ${url}/control/{system_name}/{field} body `} data={{
            value: "string"
        }}/>
        </>
    )
}