import { setAPIModule } from "@renderer/entites/module/lib/reducers/moduleReducer"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { FAB, EmptyPage, GridLayout, GridLayoutItem } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from "react"
import './APIPage.scss'
import { Navigation } from "@renderer/widgets/Navigation"
import { DialogPortal } from "@renderer/shared/ui"
import { APICard } from "@renderer/widgets/APICard"
import { EditAPIDialog } from "@renderer/features/UrlDialogs"
import { IAPI } from "@renderer/entites/module/models/APIModels/API"

interface EditAPIData{
    index: number
    data: IAPI
}

export const URLPage = () => {

    const {api} = useAppSelector(state=>state.module)
    const [addAPICard, setEditAPICard] = useState<EditAPIData | null | "add">(null)

    const dispatch = useAppDispatch()

    const APIDialogHandler = useCallback((data:IAPI, index?: number) => {
        let newApi = api.slice()
        if(index === undefined)
            newApi.push(data)
        else
            newApi[index] = data
        dispatch(setAPIModule(newApi))
        setEditAPICard(null)
    },[api, dispatch])

    return(
        <>
		<Navigation/>
        <div className="page-container">
            {
                (api.length > 0)?
                <GridLayout minWith="100%" itemMinWith='350px' itemMaxWith='450px' gridColumnGap='10px'>
                {
                    api.map((item, index)=>(
                        <GridLayoutItem key={index}>
                            <APICard data={item} onEdit={()=>setEditAPICard({index, data:item})}/>
                        </GridLayoutItem>
                    ))
                }
                </GridLayout>:
                <EmptyPage btn={{
                    text: "create",
                    onClick: ()=>setEditAPICard("add")
                }} title="The API have not been created yet" hexColor="#FFF" style={{margin: "0",height: "100dvh"}}/>
            }
        </div>
        <FAB onClick={()=>setEditAPICard("add")}>+</FAB>
        {
            (addAPICard)?
            <DialogPortal>
                <EditAPIDialog 
                data={(addAPICard && addAPICard != "add")?addAPICard.data:undefined} 
                index={(addAPICard && addAPICard != "add")?addAPICard.index:undefined} 
                onHide={()=>setEditAPICard(null)} 
                onChange={APIDialogHandler}/>
            </DialogPortal>
            :null
        }
        </>
    )
}