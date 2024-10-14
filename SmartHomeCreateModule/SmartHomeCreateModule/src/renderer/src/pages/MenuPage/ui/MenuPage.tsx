import { setMenuModule } from "@renderer/entites/module/lib/reducers/moduleReducer"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { FAB, EmptyPage } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from "react"
import { Navigation } from "@renderer/widgets/Navigation"
import { MenuCard } from '@renderer/widgets/MenuCard'
import { AddMenuDialog } from "@renderer/features/AddMenuDialog"


export const MenuPage = () => {

    const {menu} = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()
    const [addPageCArdVisible, setAddPageCardVisible] = useState<boolean>(false)

    const deleteHandler = useCallback((index:number) => {
        dispatch(setMenuModule(menu.filter((_, indexDialog)=>indexDialog !== index)))
    },[menu, dispatch])

    return(
        <>
		<Navigation/>
        <div className="page-container">
            {
                (menu.length > 0)?
                menu.map((item, index)=>(
                    <MenuCard name={item.name} components={item.components} key={index} index={index} onDelete={deleteHandler}/>
                )):
                <EmptyPage btn={{
                    text: "create",
                    onClick: ()=>setAddPageCardVisible(true)
                }} title="The pages have not been created yet" hexColor="#FFF" style={{margin: "0",height: "100dvh"}}/>
            }
        </div>
        <FAB onClick={()=>setAddPageCardVisible(true)} className="fab-in-page">+</FAB>
        {
            addPageCArdVisible && <AddMenuDialog onHide={()=>setAddPageCardVisible(false)} onCreate={(data)=>{
                let menus = menu.slice()
                menus.push(data)
                dispatch(setMenuModule(menus))
                setAddPageCardVisible(false)
            }}/>
        }
        </>
    )
}