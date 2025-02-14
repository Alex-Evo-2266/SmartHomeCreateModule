import { BaseActionCard, Card, FilledButton } from 'alex-evo-sh-ui-kit'
import { useNavigate } from 'react-router-dom'

interface FunctionCardProps{
    name:string
    keyFunction:string
    type?: string
}

export const FunctionCard = ({keyFunction, type}:FunctionCardProps) => {

    const navigate = useNavigate()

    return(
        <>
            <Card 
                className='function-card' 
                header={type} 
                text={keyFunction} 
                action={<BaseActionCard>
                    <FilledButton onClick={()=>navigate(`/function/constructor/${keyFunction}`)}>edit</FilledButton>
                </BaseActionCard>}
            />
        </>
        
    )
}