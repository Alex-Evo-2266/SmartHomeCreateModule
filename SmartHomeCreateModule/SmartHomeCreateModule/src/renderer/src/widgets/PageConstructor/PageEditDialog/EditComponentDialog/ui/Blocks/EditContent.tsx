import { BaseContent, TypeContent } from "@renderer/entites/module/models/pageModels/pageModel"
import { TypeAPI } from "@renderer/entites/module/models/types"
import { SelectURL } from "@renderer/features/UrlDialogs"
import { FieldContainer, SigmentedButton } from "alex-evo-sh-ui-kit"
import React, { ReactNode, useCallback, useState } from "react"

interface EditContentProps{
    data: BaseContent
    onChange: (nameField: string, value: string)=>void
    children: ReactNode
}

export const EditContent:React.FC<EditContentProps> = ({onChange, data, children}) => {

    const [typeContent, setTypeContent] = useState<TypeContent>(data.content_type)
    const contentTypeHandler = useCallback((value: string[]) => {
        setTypeContent(value[0] as TypeContent)
        onChange("content_type", value[0] as TypeContent)
    },[onChange])

    return(
        <FieldContainer header='content'>
            <SigmentedButton value={typeContent} onChange={contentTypeHandler} items={Object.values(TypeContent)}/>
            {
                (typeContent === TypeContent.LOAD)?
                <SelectURL typeAPI={TypeAPI.ACTION} border placeholder="src content" value={data.content_target} onChange={(value)=>onChange("content_target" ,value)}/>:
                <>{children}</>
            }
        </FieldContainer>
    )
}

export const useEditContent = (data:BaseContent) => {

    const [content, setContent] = useState<BaseContent>({content_type: data.content_type, content_target: data.content_target})

    const changeContent = useCallback((name: string, value: any) => {
        setContent({...content, [name]:value})
    },[content])

    return {changeContent ,content, setContent}
}