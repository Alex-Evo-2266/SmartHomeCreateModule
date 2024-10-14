import './PageCard.scss'
import { BaseActionCard, BaseDialog, Card, FilledButton } from 'alex-evo-sh-ui-kit'
import { useURL } from '@renderer/entites/Url'
import { useNavigate } from 'react-router-dom'
import { IComponents } from '@renderer/entites/module/models/components'
import { useState } from 'react'
import { DialogPortal } from '@renderer/shared/ui'

interface PageCardProps{
    name:string
    url:string
    page?: IComponents
    index: number
    onDelete: (index:number)=>void
}

export const PageCard = ({name, url, index, onDelete}:PageCardProps) => {

    const {getFullPageURL} = useURL()
    const navigate = useNavigate()
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

    return(
        <>
            <Card 
                className='page-card' 
                header={name} 
                text={`url: ${getFullPageURL(url)}`} 
                action={<BaseActionCard>
                    <FilledButton onClick={()=>navigate(`/page/constructor/${index}`)}>edit</FilledButton>
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