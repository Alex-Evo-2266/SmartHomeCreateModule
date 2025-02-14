import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "@renderer/pages/HomePage"
import { RootPage } from "@renderer/pages/RootPage"
import { PagesPage } from "@renderer/pages/PagesPage"
import { URLPage } from "@renderer/pages/URLPage/ui/APIPage"
import { FunctionPage } from "@renderer/pages/FunctionPage"
import { DialogsPage } from "@renderer/pages/DialogsPage/ui/DialogsPage"
import { ConstructorPage } from "@renderer/pages/ConstructorPage/indes"
import { ConstructorDialog } from "@renderer/pages/ConstructorDialogPage"
import { MenuPage } from "@renderer/pages/MenuPage/ui/MenuPage"
import { ConstructorMenu } from "@renderer/pages/MenuConstructorPage"
import { DevicesPage } from "@renderer/pages/DevicesPage"
import { FunctionEditPage } from "@renderer/pages/FunctionEditPage"


export const useRoutes = ()=>{

	return (
		<Routes>
			<Route path="/home" element={<HomePage/>}/>
			<Route path="/" element={<HomePage/>}/>
			<Route path="page/constructor/:index" element={<ConstructorPage/>}/>
			<Route path="/" element={<RootPage/>}>
				<Route path="page" element={<PagesPage/>}/>
				<Route path="dialog/constructor/:index" element={<ConstructorDialog/>}/>
				<Route path="dialog" element={<DialogsPage/>}/>
				<Route path="menu/constructor/:index" element={<ConstructorMenu/>}/>
				<Route path="menu" element={<MenuPage/>}/>
				<Route path="devices" element={<DevicesPage/>}/>
				<Route path="apiPage" element={<URLPage/>}/>
				<Route path="function/constructor/:key" element={<FunctionEditPage/>}/>
				<Route path="function" element={<FunctionPage/>}/>
				<Route path="/*" element={<Navigate replace to="/home" />} />
			</Route>
		</Routes>
	)
}