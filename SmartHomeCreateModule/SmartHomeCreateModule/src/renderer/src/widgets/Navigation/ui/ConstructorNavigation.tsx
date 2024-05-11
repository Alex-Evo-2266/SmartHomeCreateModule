import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { ScreenSize, useScreenSize } from "../../../entites/ScreenSize"

import {NavigationBar, NavigationDrawer, NavigationRail, NavigationButton as NB} from 'alex-evo-sh-ui-kit'
import { Home, Menu, Plus, Pencil } from "lucide-react"
import { useCallback, useState } from "react"
import { setEditMode } from "@renderer/entites/module/lib/reducers/editComponentReducer"
import { AddPageComponentDialog } from "@renderer/features/AddPageComponentDialog"
import { hideDialog, showDialog } from "@renderer/shared/lib/reducers/dialogReducer"

export const NavigationConstructor = () => {

	const {screen} = useScreenSize()
    const dispatch = useAppDispatch()
    const {mode} = useAppSelector(state=>state.editPageMode)
	const [visible, setVisible] = useState<boolean>(false)

	const addComponent = useCallback(()=>{
        dispatch(showDialog(<AddPageComponentDialog onHide={()=>dispatch(hideDialog())}/>))
    },[dispatch])

	const BarBtn:NB[] = [{
		text: "menu",
		type: "button",
		onClick: ()=>setVisible(prev=>!prev),
		icon: <Menu/>
	},
	{
		text: "home",
		type:"link",
		to: "/home",
		icon: <Home/>
	},
    {
		text: "add",
		type:"button",
        onClick: addComponent,
		icon: <Plus/>
	}
	]

    const getBtn = useCallback(()=>{
        let RailBtn:NB[] = [
            {
                text: "home",
                type:"link",
                to: "/home",
                icon: <Home/>
            },
            {
                text: "edit",
                type:"button",
                onClick: ()=>dispatch(setEditMode(!mode)),
                icon: <Pencil/>,
                active: mode
            }
        ]
        if(!mode)
            RailBtn.push({
                text: "add",
                type:"button",
                onClick: addComponent,
                icon: <Plus/>
        })
        return RailBtn
    },[mode, dispatch])

	if(screen === ScreenSize.MOBILE)
		return(
			<>
				<NavigationDrawer 
				onHide={()=>setVisible(false)}
				openAlways={false}
				visible={visible} 
				mainBtn={getBtn()} 
				/>
				<NavigationBar
					btns={BarBtn}
				/>
			</>
		)

	if(screen === ScreenSize.STANDART)
		return(
		<>
			<NavigationDrawer 
			onHide={()=>setVisible(false)}
			openAlways={false}
			visible={visible} 
			mainBtn={getBtn()} 
			/>
			<NavigationRail 
			onToggleMenu={()=>setVisible(prev=>!prev)} 
			mainBtn={getBtn()}
			/>
		</>
		)

	return(
	<>
		<NavigationDrawer 
			onHide={()=>setVisible(false)}
			openAlways={true}
			visible={visible} 
			mainBtn={getBtn()} 
			/>
	</>
	)
}