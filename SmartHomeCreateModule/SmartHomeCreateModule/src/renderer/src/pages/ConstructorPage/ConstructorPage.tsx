import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import  './ConstructorPage.scss'
import { ConstructorPanel } from './ConstructorPanel/ConstructorPanel'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo } from 'react'
import { IComponents } from '@renderer/entites/module/models/components'
import { setPageModule } from '@renderer/entites/module/lib/reducers/moduleReducer'
import { Preview } from './Preview/Preview'

export const ConstructorPage:React.FC = () => {

    const {pages} = useAppSelector(state=>state.module)
    const {index} = useParams()
    const page = useMemo<IComponents | undefined | null>(()=>index && pages[index].page, [index, pages])
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
        <div>
            <ConstructorPanel component={page} onChange={changeHandler}/>
            <Preview page={page}/>
        </div>
    )
}