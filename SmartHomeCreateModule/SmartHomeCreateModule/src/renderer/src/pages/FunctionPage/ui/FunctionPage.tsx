import { useNavigate } from 'react-router-dom'
import './FunctionPage.scss'
import { Button, Card, GridLayout, GridLayoutItem } from 'alex-evo-sh-ui-kit'
import { useCallback } from 'react'
import { useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { getFunction } from '@renderer/entites/module/lib/helpers/getFunction'

export const FunctionPage = () => {

    const navigate = useNavigate()
    const {pages} = useAppSelector(state=>state.module)

    const getFunctionbyPages = useCallback(() => {
        return pages.map(page=>getFunction(page.page)).flat()
    },[pages])

    return(
        <div className='home-page'>
            <Button onClick={()=>navigate('/home')}>home</Button>
            <GridLayout>
            {
                getFunctionbyPages().map((item, index)=>(
                    <GridLayoutItem key={index}>
                        <Card header={item.type} subhead={item.key}></Card>
                    </GridLayoutItem>
                ))
            }
            </GridLayout>
        </div>
    )
}