import { APICardPreview } from "@renderer/entites/APIVis"
import { useURL } from "@renderer/entites/Url"
import { getAPIItem } from "@renderer/entites/module"
import { IAPI } from "@renderer/entites/module/models/APIModels/API"
import { TypeAPI } from "@renderer/entites/module/models/types"
import { BaseActionCard, Card, FilledButton } from "alex-evo-sh-ui-kit"

interface APICardProps{
    data:IAPI
    onEdit:()=>void
}

export const APICard = ({data, onEdit}:APICardProps) => {

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
            </BaseActionCard>}
        >
            {
                (data.use_type)?
                <>type: {getAPIItem(data.use_type)?.icon}</>:
                null
            }
            {
                (data.use_type === TypeAPI.CARD)?
                <APICardPreview url={getFullURL(data.url)}/>:
                null
            }
        </Card>
        </>
        
    )
}