import { setPageModule } from "@renderer/entites/module/lib/reducers/moduleReducer"
import { AddPageDialog } from "@renderer/features/AddPageDialog/ui/AddPageDialog"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { hideDialog, showDialog } from "@renderer/shared/lib/reducers/dialogReducer"
import { FAB, EmptyPage } from 'alex-evo-sh-ui-kit'
import { PageCard } from "@renderer/widgets/PageCard/ui/PageCard"
import { useCallback } from "react"
import './PagesPage.scss'
import { Navigation } from "@renderer/widgets/Navigation"


export const PagesPage = () => {

    const {pages} = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()

    const addPage = useCallback(()=>{
        dispatch(showDialog(<AddPageDialog onHide={()=>dispatch(hideDialog())} onCreate={(data)=>{
            let page = pages.slice()
            page.push(data)
            dispatch(setPageModule(page))
            dispatch(hideDialog())
        }}/>))
    },[dispatch, pages])

    return(
        <>
		<Navigation/>
        <div className="page-container">
            {
                (pages.length > 0)?
                pages.map((item, index)=>(
                    <PageCard name={item.name} url={item.url} page={item.page} key={index} index={index}/>
                )):
                <EmptyPage btn={{
                    text: "create",
                    onClick: addPage
                }} title="The pages have not been created yet" hexColor="#FFF" style={{margin: "0",height: "100dvh"}}/>
            }
        </div>
        <FAB onClick={addPage}>+</FAB>
        </>
    )
}