import { Navigate, Route, Routes } from "react-router-dom"
import { CreatePage } from "./pages/createPage/createPage"
import { MainPage } from "./pages/mainPage"
import { RootComponents } from "./pages/rootComponents"


export const useRoutes = ()=>{
	return (
		<Routes>
					<Route path="/" element={<RootComponents/>}>
						<Route path="/createPage" element={<CreatePage/>}></Route>
						<Route path="/home" element={<MainPage/>}></Route>
						<Route path="/*" element={<Navigate replace to="/home" />} />
						<Route path="" element={<Navigate replace to="/home" />} />
					</Route>
			</Routes>
	)
}