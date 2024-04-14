import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { RootPage } from "../pages/RootPage"
import { PagesPage } from '../pages/PagesPage'


export const useRoutes = ()=>{

	return (
		<Routes>
			<Route path="/" element={<RootPage/>}>
				<Route path="home" element={<HomePage/>}/>
				<Route path="page" element={<PagesPage/>}/>
				<Route path="/*" element={<Navigate replace to="/home" />} />
			</Route>
		</Routes>
	)
}