import { Navigate, Route, Routes } from "react-router-dom"
import { APIPage } from "./pages/apiPage/apiPage"
import { CreatePage } from "./pages/createPage/createPage"
import { MainPage } from "./pages/mainPage"
import { Pages } from "./pages/pages/pages"
import { RootComponents } from "./pages/rootComponents"


export const useRoutes = ()=>{
	return (
		<Routes>
			<Route path="/" element={<RootComponents/>}>
				<Route path="pages/" element={<Pages/>}></Route>
				<Route path="pages/createPage/:name" element={<CreatePage/>}></Route>
				<Route path="api/" element={<APIPage/>}></Route>
				<Route path="home/" element={<MainPage/>}></Route>
				<Route path="/*" element={<Navigate replace to="/home" />} />
				<Route path="" element={<Navigate replace to="/home" />} />
			</Route>
		</Routes>
	)
}