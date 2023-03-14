import React, { DOMElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/menu";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { DialogType, showDialog } from "../store/reducers/dialogReducer";
import { set_module, TypeRequest } from "../store/reducers/moduleReducer";

export const APIPage:React.FC = () =>{

	const dispatch = useDispatch()
	const module = useTypeSelector(state=>state.module)

	const addAPI = (e:React.MouseEvent<HTMLButtonElement>) => {
		dispatch(showDialog({type:DialogType.TEXT, title:"create api", text: "url entered", callback:(data)=>{
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
		let newPages = module.api.filter((_, index2)=>index2!==index)
		dispatch(set_module({...module, api: newPages}))
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
						<th></th>
					</tr>
				</thead>
				<tbody>
				{
					module.api.map((item, index)=>(
						<tr key={index}>
							<td><input className={`${(item.name === "")?"fail":""}`} type="type" value={item.name} onChange={(e)=>changeName(e, index)}/></td>
							<td><input type="type" value={item.url} onChange={(e)=>changeURL(e, index)}/></td>
							<td>
								<select value={item.type} onChange={(e)=>changeType(e, index)}>
									<option value={TypeRequest.GET}>GET</option>
									<option value={TypeRequest.POST}>POST</option>
								</select>
							</td>
							<td><button className="btn" style={{background: "red"}} onClick={()=>del(index)}>delete</button></td>
						</tr>
					))
				}
				</tbody>
			</table>
			<button className="btn" onClick={addAPI}>create</button>
        </div>
	)
}