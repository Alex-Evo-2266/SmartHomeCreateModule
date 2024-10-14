import { BaseActionCard, BaseDialog, Card, FilledButton } from 'alex-evo-sh-ui-kit'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { DialogPortal } from '@renderer/shared/ui'
import { IMenuItem } from 'alex-evo-web-constructor'

interface MenuCardProps{
    name:string
    components?: IMenuItem[]
    index: number
    onDelete:(index: number)=>void
}

export const MenuCard = ({name, index, onDelete}:MenuCardProps) => {

    const navigate = useNavigate()
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

    return(
        <>
        <Card 
            className='page-card' 
            header={name} 
            action={<BaseActionCard>
                <FilledButton onClick={()=>navigate(`/menu/constructor/${index}`)}>edit</FilledButton>
                <FilledButton style={{backgroundColor: "var(--Error-color)"}} onClick={()=>setDeleteDialogVisible(true)}>delete</FilledButton>
            </BaseActionCard>}
        />
        {
            deleteDialogVisible && <DialogPortal>
                <BaseDialog 
                header="Delete component" 
                text="Are you sure you want to remove the component?" 
                onHide={()=>setDeleteDialogVisible(false)}
                onSuccess={()=>onDelete(index)}
                />
            </DialogPortal>
        }
        </>
        
    )
}