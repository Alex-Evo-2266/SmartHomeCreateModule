import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/menu";
import { useTypeSelector } from "../hooks/useTypeSelector";

export const RootComponents:React.FC = () =>{

	return(
		<>
			<main className="root-container">
				<Outlet/>
			</main>
		</>
	)
}