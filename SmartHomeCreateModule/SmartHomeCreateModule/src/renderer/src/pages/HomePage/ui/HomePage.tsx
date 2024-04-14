import { Button, Card, FilledButton, ListContainer, ListItem, TextField } from '@renderer/shared/ui'
import './HomePage.scss'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {

    const navigate = useNavigate()

    return(
        <div className='home-page'>
            <Card header='Module Creater' className='home-card'>
                <TextField border placeholder='name module'/>
                <ListContainer transparent>
                    <ListItem header='Pages' hovered className='home-page-card-item' onClick={()=>navigate("/page")}/>
                    <ListItem header='API' hovered className='home-page-card-item' onClick={()=>navigate("/apiPage")}/>
                </ListContainer>
                <FilledButton>Save</FilledButton>
            </Card>
        </div>
    )
}