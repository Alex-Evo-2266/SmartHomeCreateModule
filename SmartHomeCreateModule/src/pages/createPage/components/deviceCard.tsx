import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { BaseCard } from "../../../components/card/card";
import { IContextItem } from "../../../components/contextMenu/contextMenuElement";
import { DopMenu } from "../../../components/contextMenu/dopMenu";
import { RunText } from "../../../components/runText";
import { useURL } from "../../../hooks/useURL.hook";
import { DialogType, showDialog } from "../../../store/reducers/dialogReducer";
import { DeviceCardConfig } from "./componentConfig/deviceCardConfig";
import { IDeviceCard } from "../../../interfaces/otherComponents";

interface Props {
	item: IDeviceCard
    update: (data:IDeviceCard)=>void
	del: ()=>void
}

export const DeviceCard:React.FC<Props> = ({item, update, del}:Props) =>{

	const dispatch = useDispatch()
	const {getFullURL} = useURL()


	const configDialog = useCallback(() => {
		dispatch(showDialog({type: DialogType.CASTOM, title: "edit component", html: <DeviceCardConfig update={update} item={item} del={()=>{
			dispatch(showDialog({type: DialogType.ALERT, title: "delete component", callback: ()=>{
				del()
			}}))
		}}/>}))
	},[item, dispatch, del, update])


	const getButtons = ()=>{
		let btns: IContextItem[] = [
			{title:"test", type:"base"},
		]
		return (btns)
	}

	return(
		<BaseCard className="device-card" onContextMenu={configDialog}>
			<DopMenu buttons={getButtons()} style={{right: "0"}}/>
			<div className='card-content'>
				<br/>
				<br/>
				<div className='device-card-title'>
					<RunText text={(item.src)?`src url - ${getFullURL(item.src)} | src.name or srs[].name`:""} id={item.title ?? "1"}/>
				</div>
				<p>src.information</p>
			</div>
			<div className='dividers'></div>
			<div className='card-content'>
                {`src.fields = [{
                    name: string,
                    value: string,
                    type?: string,
                    url_send?: string
                }]`}
			</div>
			<div className='card-btn-container'>
			</div>
			

		</BaseCard>
	)
}