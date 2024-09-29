import { IComponents } from "@renderer/entites/module/models/pageModel"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import './PageConstructor.scss'
import { WebConstructor } from "alex-evo-web-constructor"
import { ConstructorPanel } from "@renderer/widgets/PageConstructor"
import { setPageModule } from "@renderer/entites/module/lib/reducers/moduleReducer"


export const PageConstructor = () => {

    const {index} = useParams()
    const {pages} = useAppSelector(state=>state.module)
    const page = useMemo<IComponents | null>(()=>index && pages[index]?.page, [pages, index])

    const dispatch = useAppDispatch()

    const changeHandler = useCallback((data: IComponents | undefined | null) => {
        if(!index) return;
        let arrPages = pages.slice()
        arrPages[index] = {...arrPages[index], page: data}
        dispatch(setPageModule(arrPages))
    },[dispatch, index])

    useEffect(()=>{
        console.log(page)
    },[page])

    return(
        <>
        <ConstructorPanel component={page} onChange={changeHandler}/>
            <div className={`constructor-page component-container`}>
                {
                    (page)?
                    <WebConstructor 
                        data={page} 
                        containerMenu={document.getElementById('menu-root')} 
                        containerModal={document.getElementById('modal-root')}
                    />:null
                }
                
            </div>
        </>
        
    )
}