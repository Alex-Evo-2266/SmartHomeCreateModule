import React, { DOMElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Menu } from "../../components/menu";
import { usePage } from "../../hooks/usePage";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { useURL } from "../../hooks/useURL.hook";
import { AlertType, show_alert } from "../../store/reducers/alertReducer";
import { DialogType, showDialog } from "../../store/reducers/dialogReducer";
import { set_module } from "../../store/reducers/moduleReducer";
import { PageItem } from "./PageItem";

export const Pages:React.FC = () =>{

	const dispatch = useDispatch()
	const module = useTypeSelector(state=>state.module)
	const pages = usePage()
	const {validURL} = useURL()

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

	const del = (index:number) => {
		let newPages = module.pages.filter((_, index2)=>index2!==index)
		dispatch(set_module({...module, pages: newPages}))
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
						<th></th>
					</tr>
				</thead>
				<tbody>
				{
					module.pages.map((item, index)=>(
						<PageItem index={index} item={item} del={del} changeName={changeName} changeURL={changeURL}/>
					))
				}
				</tbody>
			</table>
			<button className="btn" onClick={addPage}>create</button>
        </div>
	)
}