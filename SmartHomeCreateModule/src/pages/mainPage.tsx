import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Menu } from "../components/menu";
import { useTypeSelector } from "../hooks/useTypeSelector";

export const MainPage:React.FC = () =>{

	return(
		<div>
            <Link className="btn" to="/createPage">create</Link>
        </div>
	)
}