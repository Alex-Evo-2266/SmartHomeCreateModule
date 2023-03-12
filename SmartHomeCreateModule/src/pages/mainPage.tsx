import React, { DOMElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/menu";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { set_module } from "../store/reducers/moduleReducer";

export const MainPage:React.FC = () =>{

	const dispatch = useDispatch()
	const module = useTypeSelector(state=>state.module)
	
	const changeName = (event:React.ChangeEvent<HTMLInputElement>)=>{
		dispatch(set_module({...module, name:event.target.value}))
	}

	return(
		<div className="home_container">
			<div className="input-data">
				<input className="color-normal-v2" required type="text" name="name_module" onChange={changeName} value={module.name}/>
				<label>Title</label>
			</div>
            <Link className="btn" to="/createPage">create</Link>
			<button className="btn" onClick={()=>{}}>save</button>
        </div>
	)
}