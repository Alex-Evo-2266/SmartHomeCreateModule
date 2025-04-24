import { setPageModule } from "@renderer/entites/module/lib/reducers/moduleReducer"
import { AddPageDialog } from "@renderer/features/AddPageDialog/ui/AddPageDialog"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { FAB, EmptyPage, Plus } from 'alex-evo-sh-ui-kit'
import { PageCard } from "@renderer/widgets/PageCard/ui/PageCard"
import { useCallback, useState } from "react"
import './PagesPage.scss'
import { Navigation } from "@renderer/widgets/Navigation"

export const PagesPage = () => {

    const {pages} = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()
    const [addPageCArdVisible, setAddPageCardVisible] = useState<boolean>(false)

    const deleteHandler = useCallback((index:number) => {
        dispatch(setPageModule(pages.filter((_, indexDialog)=>indexDialog !== index)))
    },[pages, dispatch])

    return(
        <>
		<Navigation/>
        <div className="page-container">
            {
                (pages.length > 0)?
                pages.map((item, index)=>(
                    <PageCard name={item.name} url={item.url} page={item.page} key={index} index={index} onDelete={deleteHandler}/>
                )):
                <EmptyPage btn={{
                    text: "create",
                    onClick: ()=>setAddPageCardVisible(true)
                }} title="The pages have not been created yet" hexColor="#FFF" style={{margin: "0",height: "100dvh"}}/>
            }
        </div>
        <FAB onClick={()=>setAddPageCardVisible(true)} className="fab-in-page" icon={<Plus/>}/>
        {
            (addPageCArdVisible) && <AddPageDialog onHide={()=>setAddPageCardVisible(false)} onCreate={(data)=>{
                let page = pages.slice()
                page.push(data)
                dispatch(setPageModule(page))
                setAddPageCardVisible(false)
            }}/>
        }
        </>
    )
}