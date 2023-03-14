import React, { DOMElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/menu";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { set_module } from "../store/reducers/moduleReducer";

export const CreateAPIPage:React.FC = () =>{

	const dispatch = useDispatch()
	const module = useTypeSelector(state=>state.module)

	return(
		<div className="home_container">
			
        </div>
	)
}