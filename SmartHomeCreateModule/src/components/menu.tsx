import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { IMenuState, MenuTypesActions } from "../store/reducers/menuReducer";
import { set_type } from "../store/reducers/choiseTypeReducer";
import {ColumnsSVG} from '../svg/columns'
import { TypeComponent } from "../interfaces/typesComponent";

export const Menu:React.FC = () =>{
	const dispatch = useDispatch()
	const menuData:IMenuState = useTypeSelector(state=>state.menu)
	const [componentsVisible, setComponentsVisible] = useState<boolean>(false)

	const setType = (type:TypeComponent | null) => {
		if (!type) return
		dispatch(set_type({type}))
	}

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
					<Link to="/home">
						<span className="icon"><i className="fas fa-arrow-left"></i></span>
						<span className="title">Save</span>
					</Link>
				</li>
				<li>
					<div className={`falseLink ${(componentsVisible)?"active":""}`} onClick={()=>setComponentsVisible(prev=>!prev)}>
						<span className="icon"><i className="fas fa-plus"></i></span>
						<span className="title">Add</span>
					</div>
				</li>
			</ul>
			<ul className={`dop-menu ${(componentsVisible)?"active":""}`} onClick={()=>setComponentsVisible(false)}>
				<li>
					<div className={`falseLink`} onClick={()=>setType(TypeComponent.CARD)}>
						<span className="icon"><i className="fas fa-window-maximize"></i></span>
						<span className="title">card</span>
					</div>
				</li>
				<li>
					<div className={`falseLink`} onClick={()=>setType(TypeComponent.DEVICE_CARD)}>
						<span className="icon"><i className="fas fa-window-maximize"></i></span>
						<span className="title">device card</span>
					</div>
				</li>
				<li>
					<div className={`falseLink`} onClick={()=>setType(TypeComponent.IMAGE)}>
						<span className="icon"><i className="fas fa-image"></i></span>
						<span className="title">image</span>
					</div>
				</li>
				<li>
					<div className={`falseLink`} onClick={()=>setType(TypeComponent.TEXT)}>
						<span className="icon"><i className="fas fa-t">T</i></span>
						<span className="title">text</span>
					</div>
				</li>
				<li>
					<div className={`falseLink`} onClick={()=>setType(TypeComponent.FORM)}>
						<span className="icon"><i className="fas fa-i-cursor"></i></span>
						<span className="title">form</span>
					</div>
				</li>
				<li>
					<div className={`falseLink`} onClick={()=>setType(TypeComponent.BUTTON)}>
						<span className="icon"><i className="fas fa-i-cursor"></i></span>
						<span className="title">button</span>
					</div>
				</li>
				<li>
					<div className={`falseLink`} onClick={()=>setType(TypeComponent.TABLE)}>
						<span className="icon"><i className="fas fa-table"></i></span>
						<span className="title">table</span>
					</div>
				</li>
				<li>
					<div className={`falseLink`} onClick={()=>setType(TypeComponent.COLUMNS)}>
						<span className="icon"><i className="fas fa-columns"></i></span>
						<span className="title">columns</span>
					</div>
				</li>
			</ul>
		</div>
		</>
	)
}