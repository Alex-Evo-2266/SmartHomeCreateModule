import { BaseActionCard, Card, FilledButton } from 'alex-evo-sh-ui-kit'
import { useNavigate } from 'react-router-dom'
import { IComponents } from '@renderer/entites/module/models/components'
import './DialogCard.scss'

interface DialogCardProps{
    name:string
    title:string
    components?: IComponents
    index: number
}

export const DialogCard = ({name, title, index}:DialogCardProps) => {

    const navigate = useNavigate()

    return(
        <Card 
            className='page-card' 
            header={name} 
            text={`title: ${title}`} 
            action={<BaseActionCard>
                <FilledButton onClick={()=>navigate(`/dialog/constructor/${index}`)}>edit</FilledButton>
            </BaseActionCard>}
        />
    )
}