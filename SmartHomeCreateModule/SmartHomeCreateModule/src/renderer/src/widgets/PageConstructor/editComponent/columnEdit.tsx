import { Src } from "@renderer/entites/module/models/pageModel"
import { ContentBox, FullScrinTemplateDialog, NumberField } from "alex-evo-sh-ui-kit"
import { IColumns } from "alex-evo-web-constructor"
import { useCallback, useState } from "react"

interface ColumnsEditProps{
    onHide: ()=>void,
    onSave: (data: IColumns & {src:Src})=>void,
    data: IColumns & {src:Src}
}

export const ColumnsEdit:React.FC<ColumnsEditProps> = ({onHide, onSave, data}) => {

    const [value, setValue] = useState<IColumns & {src:Src}>(data)

    const save = () => {
        onSave({...value})
    }

    const changeCount = useCallback((value: number)=>{
        setValue(prev=>({...prev, count: value}))
    },[])

    return(
        <FullScrinTemplateDialog onHide={onHide} onSave={save}>
            <ContentBox label="column count">
                <NumberField value={value.count} name="count" onChange={changeCount}/>
            </ContentBox>
        </FullScrinTemplateDialog>
    )
}