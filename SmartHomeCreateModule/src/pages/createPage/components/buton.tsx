import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DialogType, showDialog } from "../../../store/reducers/dialogReducer";
import { IButton, ITextField, IType, TypeComponent, TypeContent } from "../../../store/reducers/moduleReducer";
import { ButtonConfig } from "./componentConfig/buttonConfig";
import { TextConfig } from "./componentConfig/textConfig";

interface Props {
	item: IButton
	update: (data:IButton)=>void
}

export const Button:React.FC<Props> = ({item, update}:Props) =>{

	const dispatch = useDispatch()

	const configDialog = useCallback(() => {
		dispatch(showDialog({type: DialogType.CASTOM, title: "edit component", html: <ButtonConfig update={update} item={item}/>}))
	},[item])

	const getStyle = (item: IButton) => {
		let data: React.CSSProperties = {
			fontSize: item.option?.fontSize ?? 20,
			borderRadius: item.option?.borderRadius ?? 0
		}
		return data
	}

	if (item.type === TypeComponent.BUTTON)
		return(
			<button className="btn" style={getStyle(item)} onContextMenu={configDialog}>{item.title}</button>
		)
	else if (item.type === TypeComponent.LINK)
		return(
			<button className="btn" style={getStyle(item)} onContextMenu={configDialog}>{item.title}</button>
		)
	return null
}