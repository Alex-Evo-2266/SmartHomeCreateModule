import { IDevice } from "@renderer/entites/module/models/device"
import { BaseActionCard, Card, FilledButton } from "alex-evo-sh-ui-kit"

interface DeviceCardProps{
    data:IDevice
    onEdit:()=>void
    onDelete:()=>void
}

export const DeviceCard = ({data, onEdit, onDelete}:DeviceCardProps) => {

    return(
        <>
        <Card
            className='page-card' 
            header={data.name} 
            action={<BaseActionCard>
                <FilledButton onClick={onEdit}>edit</FilledButton>
                <FilledButton onClick={onDelete} style={{
                    backgroundColor: "var(--Error-color)",
                    color: "var(--On-error-color)"
                }}>delete</FilledButton>
            </BaseActionCard>}
        >
        </Card>
        </>
        
    )
}