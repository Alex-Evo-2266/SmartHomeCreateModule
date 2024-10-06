import './DialogsPage.scss'

import { setDialogModule } from "@renderer/entites/module/lib/reducers/moduleReducer"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { FAB, EmptyPage } from 'alex-evo-sh-ui-kit'
import { useState } from "react"
import { Navigation } from "@renderer/widgets/Navigation"
import { DialogPortal } from "@renderer/shared/ui"
import { DialogCard } from '@renderer/widgets/DialogCard/ui/DialogCard'
import { AddDialogDialog } from '@renderer/features/AddDialogDialog/ui/AddDialogDialog'


export const DialogsPage = () => {

    const {dialog: dialogs} = useAppSelector(state=>state.module)
    const t = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()
    const [addPageCArdVisible, setAddPageCardVisible] = useState<boolean>(false)
    console.log(dialogs, t)
    return(
        <>
		<Navigation/>
        <div className="page-container">
            {
                (dialogs.length > 0)?
                dialogs.map((item, index)=>(
                    <DialogCard name={item.name} title={item.title} components={item.components} key={index} index={index}/>
                )):
                <EmptyPage btn={{
                    text: "create",
                    onClick: ()=>setAddPageCardVisible(true)
                }} title="The pages have not been created yet" hexColor="#FFF" style={{margin: "0",height: "100dvh"}}/>
            }
        </div>
        <FAB onClick={()=>setAddPageCardVisible(true)} className="fab-in-page">+</FAB>
        {
            (addPageCArdVisible)?
            <DialogPortal>
                <AddDialogDialog onHide={()=>setAddPageCardVisible(false)} onCreate={(data)=>{
                    let dialog = dialogs.slice()
                    dialog.push(data)
                    dispatch(setDialogModule(dialog))
                    setAddPageCardVisible(false)
                }}/>
            </DialogPortal>
            :null
        }
        </>
    )
}