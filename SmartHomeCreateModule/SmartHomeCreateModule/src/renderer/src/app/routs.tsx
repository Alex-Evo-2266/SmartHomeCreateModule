import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "@renderer/pages/HomePage"
import { RootPage } from "@renderer/pages/RootPage"
import { PagesPage } from "@renderer/pages/PagesPage"
import { URLPage } from "@renderer/pages/URLPage/ui/APIPage"
import { FunctionPage } from "@renderer/pages/FunctionPage"
import { DialogsPage } from "@renderer/pages/DialogsPage/ui/DialogsPage"
import { ConstructorPage } from "@renderer/pages/ConstructorPage/indes"
import { ConstructorDialog } from "@renderer/pages/ConstructorDialog"


export const useRoutes = ()=>{

	return (
		<Routes>
			<Route path="/" element={<RootPage/>}>
				<Route path="home" element={<HomePage/>}/>
				<Route path="" element={<HomePage/>}/>
				<Route path="page/constructor/:index" element={<ConstructorPage/>}/>
				<Route path="page" element={<PagesPage/>}/>
				<Route path="dialog/constructor/:index" element={<ConstructorDialog/>}/>
				<Route path="dialog" element={<DialogsPage/>}/>
				<Route path="apiPage" element={<URLPage/>}/>
				<Route path="function" element={<FunctionPage/>}/>
				<Route path="/*" element={<Navigate replace to="/home" />} />
			</Route>
		</Routes>
	)
}