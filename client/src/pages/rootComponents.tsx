import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
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