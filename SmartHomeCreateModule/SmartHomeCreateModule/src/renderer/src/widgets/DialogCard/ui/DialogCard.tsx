import { BaseActionCard, BaseDialog, Card, FilledButton } from 'alex-evo-sh-ui-kit'
import { useNavigate } from 'react-router-dom'
import { IComponents } from '@renderer/entites/module/models/components'
import './DialogCard.scss'
import { useState } from 'react'
import { DialogPortal } from '@renderer/shared/ui'

interface DialogCardProps{
    name:string
    title:string
    components?: IComponents
    index: number
    onDelete:(index: number)=>void
}

export const DialogCard = ({name, title, index, onDelete}:DialogCardProps) => {

    const navigate = useNavigate()
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

    return(
        <>
        <Card 
            className='page-card' 
            header={name} 
            text={`title: ${title}`} 
            action={<BaseActionCard>
                <FilledButton onClick={()=>navigate(`/dialog/constructor/${index}`)}>edit</FilledButton>
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