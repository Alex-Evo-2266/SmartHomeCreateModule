import { Navigate, Route, Routes } from "react-router-dom"
import { PageConstructor } from "@renderer/pages/PageConstructor"
import { HomePage } from "@renderer/pages/HomePage"
import { RootPage } from "@renderer/pages/RootPage"
import { PagesPage } from "@renderer/pages/PagesPage"
import { URLPage } from "@renderer/pages/URLPage/ui/APIPage"


export const useRoutes = ()=>{

	return (
		<Routes>
			<Route path="/" element={<RootPage/>}>
				<Route path="home" element={<HomePage/>}/>
				<Route path="" element={<HomePage/>}/>
				<Route path="page/constructor/:index" element={<PageConstructor/>}/>
				<Route path="page" element={<PagesPage/>}/>
				<Route path="apiPage" element={<URLPage/>}/>
				<Route path="/*" element={<Navigate replace to="/home" />} />
			</Route>
		</Routes>
	)
}