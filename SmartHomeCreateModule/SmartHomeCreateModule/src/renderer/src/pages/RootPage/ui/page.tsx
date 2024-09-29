import { Outlet, useLocation } from "react-router-dom"
import './rootContainer.scss'
import { ScreenSize, useScreenSize } from "alex-evo-sh-ui-kit"
import { useCallback, useEffect } from "react"

export const RootPage = () => {

	const {screen} = useScreenSize()
	let {pathname} = useLocation();

	const getStyleClass = useCallback((screen: ScreenSize) => {
		if(screen === ScreenSize.BIG_SCREEN && pathname !== '/home')
			return "big"
		if(screen === ScreenSize.MOBILE)
			return "mobile"
		return ""
	},[pathname])

	return (
		<>
			<div className={`root-container ${getStyleClass(screen)}`}>
				<Outlet/>
			</div>
		</>
		
	)
}