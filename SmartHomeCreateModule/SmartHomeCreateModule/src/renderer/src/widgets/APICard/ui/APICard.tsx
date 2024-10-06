import { useURL } from "@renderer/entites/Url"
import { getAPIItem } from "@renderer/entites/module"
import { IAPI } from "@renderer/entites/module/models/APIModels/API"
import { BaseActionCard, Card, FilledButton } from "alex-evo-sh-ui-kit"

interface APICardProps{
    data:IAPI
    onEdit:()=>void
    onDelete:()=>void
}

export const APICard = ({data, onEdit, onDelete}:APICardProps) => {

    const {getFullURL} = useURL()

    return(
        <>
        <Card
            className='page-card' 
            header={data.name} 
            text={`type: ${data.type}\n
            url: ${getFullURL(data.url)}`} 
            action={<BaseActionCard>
                <FilledButton onClick={onEdit}>edit</FilledButton>
                <FilledButton onClick={onDelete} style={{
                    backgroundColor: "var(--Error-color)",
                    color: "var(--On-error-color)"
                }}>delete</FilledButton>
            </BaseActionCard>}
        >
            {
                (data.use_type)?
                <>type: {getAPIItem(data.use_type)?.icon}</>:
                null
            }
        </Card>
        </>
        
    )
}