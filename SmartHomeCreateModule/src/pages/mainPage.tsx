import React, { DOMElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/menu";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { set_module } from "../store/reducers/moduleReducer";
import { IPage } from "../interfaces/page";
import { IAPI } from "../interfaces/api";
import { AlertType, show_alert } from "../store/reducers/alertReducer";

export const MainPage:React.FC = () =>{

	const dispatch = useDispatch()
	const module = useTypeSelector(state=>state.module)
	
	const changeName = (event:React.ChangeEvent<HTMLInputElement>)=>{
		dispatch(set_module({...module, name:event.target.value}))
	}

	const nameValid = (name:string):boolean => {
		if (name === '')
			return false
		return true
	}

	const validPageAndAPI = (pages:IPage[] | IAPI[]):boolean => {
		for(let item of pages)
		{
			if(item.name === "" || item.url === "")
				return false
		}
		return true
	}

	const save = () => {
		console.log(module)
		if(!validPageAndAPI(module.api) || !validPageAndAPI(module.pages) || !nameValid(module.name))
		{
			return dispatch(show_alert({title: "invalid eterid data", text:"invalid eterid data", type:AlertType.ERROR}))
		}
		window.electronAPI.saveModule(module)
	}

	return(
		<div className="home_container">
			<div className="input-data">
				<input className={`${(nameValid(module.name))?"":"fail"} color-normal-v2`} required type="text" name="name_module" onChange={changeName} value={module.name}/>
				<label>Title</label>
			</div>
            <Link className="btn" to="/pages">Pages</Link>
            <Link className="btn" to="/api">API</Link>
			<button className="btn" onClick={save}>save</button>
        </div>
	)
}