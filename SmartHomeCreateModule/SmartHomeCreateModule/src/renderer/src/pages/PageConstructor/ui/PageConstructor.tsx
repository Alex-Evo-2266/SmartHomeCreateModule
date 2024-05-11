import { IComponents, IPage } from "@renderer/entites/module/models/pageModel"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './PageConstructor.scss'
import { useComponent } from '@renderer/entites/module/lib/hooks/addComponent.hook'
import { PageComponent } from '@renderer/widgets/PageComponents'
import { NavigationConstructor } from "@renderer/widgets/Navigation/ui/ConstructorNavigation"
import { setEditMode } from "@renderer/entites/module/lib/reducers/editComponentReducer"


export const PageConstructor = () => {

    const {index} = useParams()
    const {pages} = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()
    const [page, setPage] = useState<IPage | null>(index && pages[index])
    const {componentIsSelected, getComponent} = useComponent()



    const styleAddDel= useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
        const target = e.target as HTMLDivElement
        const component = target.closest(".component-container")
        component?.classList.remove("add-component")
    },[])

    const clickContainer = useCallback((e:React.MouseEvent<HTMLDivElement>) => {
        if(!componentIsSelected())
            return
        const target = e.target as HTMLDivElement
        if(target.closest(".component-container") == e.currentTarget)
        {
            let component = getComponent()
            setPage(prev=>{
                if (!prev || !component)
                    return prev
                let components = prev?.page.slice()
                components?.push(component)
                return {...prev, page:components}
            })
            styleAddDel(e)
        }
    },[getComponent])

    const styleAdd = useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
        if(componentIsSelected())
        {
            const target = e.target as HTMLDivElement
            const component = target.closest(".component-container") as HTMLElement
            component?.classList.add("add-component")
            component.onmouseout = ()=>{
                component?.classList.remove("add-component")
                component.onmouseout = null
            }
        }
    },[componentIsSelected])

    const EditComponent = useCallback((index:number, newData:IComponents) => {
        setPage(prev=>{
            if(!prev)
                return prev
            let components = prev?.page.slice()
            components[index] = newData
            return{...prev, page:components}
        })
    },[])

    const deleteComponent = useCallback((index) => {
        setPage(prev=>{
            if (!prev)
                return prev
            const newComponents = prev?.page.filter((_, index2)=>index2 != index)
            return {...prev, page: newComponents}
        })
    },[])

    useEffect(()=>{
        console.log(page)
    },[page])

    useEffect(()=>{
        return ()=>{
            dispatch(setEditMode(false))
        }
    },[])

    return(
        <>
		<NavigationConstructor/>
        <div className={`constructor-page component-container`} onMouseOver={styleAdd} onClick={clickContainer}>
            {
                page?.page.map((item, index)=>(
                    <div key={index}>
                        <PageComponent onDelete={deleteComponent} index={index} data={item} onEdit={EditComponent}/>
                    </div>
                ))
            }
        </div>
        </>
        
    )
}