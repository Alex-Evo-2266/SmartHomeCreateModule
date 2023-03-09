import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/menu";
import { useTypeSelector } from "../hooks/useTypeSelector";

export const CreatePage:React.FC = () =>{

	return(
		<>
			<Menu/>
			<div className="constructor-root-container">
				
			</div>
		</>
	)
}