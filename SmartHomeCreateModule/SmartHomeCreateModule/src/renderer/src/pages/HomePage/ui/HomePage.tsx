import { Card, FilledButton, ListContainer, ListItem, TextField } from 'alex-evo-sh-ui-kit'
import './HomePage.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { setNameModule } from '@renderer/entites/module/lib/reducers/moduleReducer'

export const HomePage = () => {

    const navigate = useNavigate()
    const {name} = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()

    const nameHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setNameModule(e.target.value))
    }

    return(
        <div className='home-page'>
            <Card header='Module Creater' className='home-card'>
                <TextField border placeholder='name module' onChange={nameHandler} value={name}/>
                <ListContainer transparent>
                    <ListItem header='Pages' hovered className='home-page-card-item' onClick={()=>navigate("/page")}/>
                    <ListItem header='API' hovered className='home-page-card-item' onClick={()=>navigate("/apiPage")}/>
                </ListContainer>
                <FilledButton>Save</FilledButton>
            </Card>
        </div>
    )
}