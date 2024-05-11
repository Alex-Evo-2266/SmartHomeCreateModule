import { IComponents } from '@renderer/entites/module/models/pageModel'
import './PageCard.scss'
import { BaseActionCard, Card, FilledButton } from 'alex-evo-sh-ui-kit'
import { useURL } from '@renderer/entites/Url'
import { useNavigate } from 'react-router-dom'

interface PageCardProps{
    name:string
    url:string
    page: IComponents[]
    index: number
}

export const PageCard = ({name, url, page, index}:PageCardProps) => {

    const {getFullPageURL} = useURL()
    const navigate = useNavigate()

    return(
        <Card 
            className='page-card' 
            header={name} 
            text={`url: ${getFullPageURL(url)}`} 
            action={<BaseActionCard>
                <FilledButton onClick={()=>navigate(`/page/constructor/${index}`)}>edit</FilledButton>
            </BaseActionCard>}
        />
    )
}