import { Card, ContentBox, FilledButton, IBlock, ListContainer, ListItem, TextField } from 'alex-evo-sh-ui-kit'
import './HomePage.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { clearModule, loadFileModule, loadModule, setNameModule } from '@renderer/entites/module/lib/reducers/moduleReducer'
import { useCallback, useEffect } from 'react'
import { DotIcon } from 'lucide-react'
import { IconButtonMenu } from '@renderer/shared/ui'


export const HomePage = () => {

    const navigate = useNavigate()
    const module = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()

    const nameHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setNameModule(e.target.value))
    }

    const {pages} = useAppSelector(state=>state.module)

    const save = useCallback(() => {
        window.api.saveModule({...module})
    },[pages])

    const load = useCallback(() => {
        window.api.loadModule()
        .then(data=>{
            if(!data)
                return
            dispatch(loadFileModule(data))
        })
        .catch(e=>console.error(e))
    },[pages])

    const newModule = useCallback(() => {
        dispatch(clearModule())
    },[pages])

    useEffect(()=>{
        dispatch(loadModule())
    },[dispatch])

    const menu: IBlock[] = [{
        items:[
            {
                title: 'new',
                onClick: newModule
            },
            {
                title: 'Load',
                onClick: load
            }
        ]
    }]

    useEffect(()=>{
        console.log(module)
    },[module])

    return(
        <>
        <div className='home-page'>
            <Card header='Module Creater' className='home-card' iconButtonCell={<IconButtonMenu blocks={menu} icon={<DotIcon/>}/>}>
                <TextField border placeholder='name module' onChange={nameHandler} value={module.name}/>
                <div className='home-page-flex'>
                    <ContentBox label='pages'>
                        <ListContainer transparent>
                            <ListItem header='Pages' hovered className='home-page-card-item' onClick={()=>navigate("/page")}/>
                            <ListItem header='API' hovered className='home-page-card-item' onClick={()=>navigate("/apiPage")}/>
                            <ListItem header='Function' hovered className='home-page-card-item' onClick={()=>navigate("/function")}/>
                            <ListItem header='Dialogs' hovered className='home-page-card-item' onClick={()=>navigate("/dialog")}/>
                            <ListItem header='Menu' hovered className='home-page-card-item' onClick={()=>navigate("/menu")}/>
                        </ListContainer>
                    </ContentBox>
                    <ContentBox label='devices'>
                        <ListContainer transparent>
                            <ListItem header='Devices' hovered className='home-page-card-item' onClick={()=>navigate("/devices")}/>
                        </ListContainer>
                    </ContentBox>
                </div>
                <FilledButton onClick={save}>Save</FilledButton>
            </Card>
        </div>
        </>
        
    )
}