import React, { DOMElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Menu } from "../../components/menu";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { useURL } from "../../hooks/useURL.hook";
import { AlertType, show_alert } from "../../store/reducers/alertReducer";
import { DialogType, showDialog } from "../../store/reducers/dialogReducer";
import { APIItem } from "./apiItem";
import { set_module } from "../../store/reducers/moduleReducer";
import { TypeRequest } from "../../interfaces/api";
import { TypeComponent } from "../../interfaces/typesComponent";

export const APIPage:React.FC = () =>{

	const dispatch = useDispatch()
	const module = useTypeSelector(state=>state.module)
	const {validURL} = useURL()

	const addAPI = (e:React.MouseEvent<HTMLButtonElement>) => {
		dispatch(showDialog({type:DialogType.TEXT, title:"create api", text: "url entered", callback:(data)=>{
			if (!validURL(data))
			{
				dispatch(show_alert({type: AlertType.ERROR, title: "invalid data", text:"invalid data"}))
				return
			}
			let newapi = module.api
			newapi.push({
				name: String(data),
				url: String(data),
				type: TypeRequest.GET
			})
			dispatch(set_module({...module, api: newapi}))
		}}))
	}

	const changeName = (e:React.ChangeEvent<HTMLInputElement>, index: number) => {
		let newPages = module.api
		newPages[index].name = e.target.value
		dispatch(set_module({...module, api: newPages}))
	}

	const changeURL = (e:React.ChangeEvent<HTMLInputElement>, index: number) => {
		let newPages = module.api
		newPages[index].url = e.target.value
		dispatch(set_module({...module, api: newPages}))
	}

	const changeType = (e:React.ChangeEvent<HTMLSelectElement>, index:number) => {
		if (e.target.value !== TypeRequest.GET && e.target.value !== TypeRequest.POST) return
		let newPages = module.api
		newPages[index].type = e.target.value
		dispatch(set_module({...module, api: newPages}))
	}

	const del = (index:number) => {
		let newAPI = module.api.filter((_, index2)=>index2!==index)
		const newPages = module.pages.map(
			item=>({...item, page: item.page.map(
				item2=>{
					if(item2.type === TypeComponent.BUTTON && item2.action_url === module.api[index].url)
						return {...item2, action_url: ""}
					return item2
				}
			)})
		)
		dispatch(set_module({...module, api: newAPI}))
	}

	return(
		<div className="pages">
			<Link className="btn" style={{background: "gray"}} to="/home">back</Link>
			<table>
				<thead>
					<tr>
						<th>name</th>
						<th>url</th>
						<th>type</th>
						<th>use</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				{
					module.api.map((item, index)=>(
						<APIItem item={item} index={index} key={index} changeName={changeName} changeType={changeType} changeURL={changeURL} del={del}/>
					))
				}
				</tbody>
			</table>
			<button className="btn" onClick={addAPI}>create</button>
        </div>
	)
}