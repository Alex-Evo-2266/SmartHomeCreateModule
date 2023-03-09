import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { IMenuState, MenuTypesActions } from "../store/reducers/menuReducer";

export const Menu:React.FC = () =>{
	const dispatch = useDispatch()
	const menuData:IMenuState = useTypeSelector(state=>state.menu)

	return(
		<>
		<div className="top-menu">
			<div className={`menu-button ${(menuData.visible)?"active":""}`} onClick={()=>dispatch({type: MenuTypesActions.MENU_TOGLE})}>
				<i className="fas fa-bars"></i>
			</div>
			<h1>{menuData.title || ""}</h1>
		</div>
		<div className={`navigation ${(menuData.visible)?"active":""}`}>
			<ul onClick={()=>dispatch({type: MenuTypesActions.MENU_HIDE})}>
				<li>
					<a>
						<span className="icon"><i className="fas fa-user"></i></span>
						<span className="title">Profile</span>
					</a>
				</li>
			</ul>
		</div>
		</>
	)
}