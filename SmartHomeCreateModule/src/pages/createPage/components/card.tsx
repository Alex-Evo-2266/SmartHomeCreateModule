import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BaseCard } from "../../../components/card/card";
import { IContextItem } from "../../../components/contextMenu/contextMenuElement";
import { DopMenu } from "../../../components/contextMenu/dopMenu";
import { RunText } from "../../../components/runText";
import { DialogType, showDialog } from "../../../store/reducers/dialogReducer";
import { ICard, ITextField, IType, TypeComponent, TypeContent } from "../../../store/reducers/moduleReducer";
import { CardConfig } from "./componentConfig/cardConfig";

interface Props {
	item: ICard
    update: (data:ICard)=>void
	del: ()=>void
}

export const Card:React.FC<Props> = ({item, update, del}:Props) =>{

	const dispatch = useDispatch()

	const configDialog = useCallback(() => {
		dispatch(showDialog({type: DialogType.CASTOM, title: "edit component", html: <CardConfig update={update} item={item} del={()=>{
			dispatch(showDialog({type: DialogType.ALERT, title: "delete component", callback: ()=>{
				del()
			}}))
		}}/>}))
	},[item])


	const getButtons = ()=>{
		let btns: IContextItem[] = [
			{title:"test", type:"base"},
			{title:"test", type:"base"}
		]
		return (btns)
	}

	return(
		<BaseCard className="device-card" onContextMenu={configDialog}>
			<DopMenu buttons={getButtons()} style={{right: "0"}}/>
			<div className='card-content'>
				<div className='device-card-title'>
					<RunText text={item.title} id={item.title}/>
				</div>
				<p>{item.text}</p>
			</div>
			<div className='dividers'></div>
			<div className='card-content'>
			</div>
			<div className='card-btn-container'>
			</div>
			

		</BaseCard>
	)
}