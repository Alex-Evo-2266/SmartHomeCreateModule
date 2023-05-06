import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { DialogType, showDialog } from "../../../store/reducers/dialogReducer";
import { TextConfig } from "./componentConfig/textConfig";
import { ITextField, TypeContent } from "../../../interfaces/otherComponents";
import { useURL } from "../../../hooks/useURL.hook";

interface Props {
	item: ITextField
    update: (data:ITextField)=>void
    del: ()=>void
}

export const Text:React.FC<Props> = ({item, update, del}:Props) =>{

    const dispatch = useDispatch()
    const {getFullURL} = useURL()

    const configDialog = useCallback(() => {
        dispatch(showDialog({type: DialogType.CASTOM, title: "edit component", html: <TextConfig update={update} item={item} del={()=>{
			dispatch(showDialog({type: DialogType.ALERT, title: "delete component", callback: ()=>{
				del()
			}}))
		}}/>}))
    },[item])

    const getStyle = (item: ITextField) => {
        let data: React.CSSProperties = {
            fontSize: item.option?.fontSize ?? 20,
            borderRadius: item.option?.borderRadius ?? 0
        }
        return data
    }

    const getText = (text: string) => {
        return text.split('\n')
    }

	if (item.type_content === TypeContent.TEXT)
		return(
			<div className="component-text" onClick={configDialog} style={getStyle(item)}>
                {
                    getText(item.value).map((item, index) => (
				        <p key={index}>{item}</p>
                    ))
                }
			</div>
		)
    else if (item.type_content === TypeContent.LOAD)
        return(
            <div className="component-text" onClick={configDialog} style={getStyle(item)}>
                <p>data in api: {getFullURL(item.value)}</p>
            </div>
        )
	return null
}