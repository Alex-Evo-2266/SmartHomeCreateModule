import React, { DOMElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/menu";
import { usePage } from "../hooks/usePage";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { AlertType, show_alert } from "../store/reducers/alertReducer";
import { DialogType, showDialog } from "../store/reducers/dialogReducer";
import { set_module } from "../store/reducers/moduleReducer";

export const Pages:React.FC = () =>{

	const dispatch = useDispatch()
	const module = useTypeSelector(state=>state.module)
	const pages = usePage()

	const changeName = (e:React.ChangeEvent<HTMLInputElement>, index: number) => {
		let newPages = module.pages
		newPages[index].name = e.target.value
		dispatch(set_module({...module, pages: newPages}))
	}

	const changeURL = (e:React.ChangeEvent<HTMLInputElement>, index: number) => {
		let newPages = module.pages
		newPages[index].url = e.target.value
		dispatch(set_module({...module, pages: newPages}))
	}

	const addPage = () => {
		dispatch(showDialog({type:DialogType.TEXT, title: "create page", text: "name new page", callback:(data)=>{
			console.log(data)
			if (pages.getPage(data))
			{
				return dispatch(show_alert({type: AlertType.ERROR, title: "a page with that name already exists.", text:"a page with that name already exists."}))
			}
			let newPages = module.pages
			newPages.push({
				name: String(data),
				url: "",
				page: []
			})
			dispatch(set_module({...module, pages: newPages}))
		}}))
	}

	return(
		<div className="pages">
			<Link className="btn" style={{background: "gray"}} to="/home">back</Link>
			<table>
				<thead>
					<tr>
						<th>name</th>
						<th>url</th>
						<th>page</th>
					</tr>
				</thead>
				<tbody>
				{
					module.pages.map((item, index)=>(
						<tr>
							<th><input className={`${(item.name === "")?"fail":""}`} type="type" value={item.name} onChange={(e)=>changeName(e, index)}/></th>
							<th><input type="type" value={item.url} onChange={(e)=>changeURL(e, index)}/></th>
							<th><Link className="btn" to={`/pages/createPage/${item.name}`}>edit</Link></th>
						</tr>
					))
				}
				</tbody>
			</table>
			<button className="btn" onClick={addPage}>create</button>
        </div>
	)
}