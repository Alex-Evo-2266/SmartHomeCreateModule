import { Card, FilledButton, ListContainer, ListItem, TextField } from 'alex-evo-sh-ui-kit'
import './HomePage.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { loadModule, setNameModule } from '@renderer/entites/module/lib/reducers/moduleReducer'
import { useCallback, useEffect } from 'react'
import { getFunction } from '@renderer/entites/module/lib/helpers/getFunction'


export const HomePage = () => {

    const navigate = useNavigate()
    const module = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()

    const nameHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setNameModule(e.target.value))
    }

    const {pages} = useAppSelector(state=>state.module)

    const save = useCallback(() => {
        const functions = pages.map(page=>getFunction(page.page)).flat()
        window.api.saveModule({...module, functions})
    },[pages])

    useEffect(()=>{
        dispatch(loadModule())
    },[dispatch])

    return(
        <>
        <div className='home-page'>
            <Card header='Module Creater' className='home-card'>
                <TextField border placeholder='name module' onChange={nameHandler} value={module.name}/>
                <ListContainer transparent>
                    <ListItem header='Pages' hovered className='home-page-card-item' onClick={()=>navigate("/page")}/>
                    <ListItem header='API' hovered className='home-page-card-item' onClick={()=>navigate("/apiPage")}/>
                    <ListItem header='Function' hovered className='home-page-card-item' onClick={()=>navigate("/function")}/>
                    <ListItem header='Dialogs' hovered className='home-page-card-item' onClick={()=>navigate("/dialog")}/>
                    <ListItem header='Menu' hovered className='home-page-card-item' onClick={()=>navigate("/menu")}/>
                </ListContainer>
                <FilledButton onClick={save}>Save</FilledButton>
            </Card>
        </div>
        </>
        
    )
}