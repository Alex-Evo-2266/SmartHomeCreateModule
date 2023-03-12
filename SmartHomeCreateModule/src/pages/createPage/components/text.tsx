import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DialogType, showDialog } from "../../../store/reducers/dialogReducer";
import { ITextField, IType, TypeComponent, TypeContent } from "../../../store/reducers/moduleReducer";
import { TextConfig } from "./componentConfig/textConfig";

interface Props {
	item: ITextField
    update: (data:ITextField)=>void
}

export const Text:React.FC<Props> = ({item, update}:Props) =>{

    const dispatch = useDispatch()

    const configDialog = useCallback(() => {
        dispatch(showDialog({type: DialogType.CASTOM, title: "edit component", html: <TextConfig update={update} item={item}/>}))
    },[item])

	if (item.type_content === TypeContent.TEXT)
		return(
			<div className="component-text" onClick={configDialog}>
				<p>{item.value}</p>
			</div>
		)
    else if (item.type_content === TypeContent.LOAD)
        return(
            <div className="component-text" onClick={configDialog}>
                <p>data in api {item.value}</p>
            </div>
        )
	return null
}