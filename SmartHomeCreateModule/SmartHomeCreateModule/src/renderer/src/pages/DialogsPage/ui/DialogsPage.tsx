import './DialogsPage.scss'

import { setDialogModule } from "@renderer/entites/module/lib/reducers/moduleReducer"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { FAB, EmptyPage } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from "react"
import { Navigation } from "@renderer/widgets/Navigation"
import { DialogCard } from '@renderer/widgets/DialogCard/ui/DialogCard'
import { AddDialogDialog } from '@renderer/features/AddDialogDialog/ui/AddDialogDialog'


export const DialogsPage = () => {

    const {dialog: dialogs} = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()
    const [addPageCArdVisible, setAddPageCardVisible] = useState<boolean>(false)

    const deleteHandler = useCallback((index:number) => {
        dispatch(setDialogModule(dialogs.filter((_, indexDialog)=>indexDialog !== index)))
    },[dialogs, dispatch])

    return(
        <>
		<Navigation/>
        <div className="page-container">
            {
                (dialogs.length > 0)?
                dialogs.map((item, index)=>(
                    <DialogCard name={item.name} title={item.title} components={item.components} key={index} index={index} onDelete={deleteHandler}/>
                )):
                <EmptyPage btn={{
                    text: "create",
                    onClick: ()=>setAddPageCardVisible(true)
                }} title="The pages have not been created yet" hexColor="#FFF" style={{margin: "0",height: "100dvh"}}/>
            }
        </div>
        <FAB onClick={()=>setAddPageCardVisible(true)} className="fab-in-page">+</FAB>
        {addPageCArdVisible && 
            <AddDialogDialog onHide={()=>setAddPageCardVisible(false)} onCreate={(data)=>{
                let dialog = dialogs.slice()
                dialog.push(data)
                dispatch(setDialogModule(dialog))
                setAddPageCardVisible(false)
            }}/>
        }
        </>
    )
}