import { Navigate, Route, Routes } from "react-router-dom"
import { RootComponents } from "./pages/rootComponents"


export const useRoutes = ()=>{
	return (
    <Routes>
          <Route path="/" element={<RootComponents/>}>
            <Route path="/*" element={<Navigate replace to="/" />} />
          </Route>
      </Routes>
	)
}