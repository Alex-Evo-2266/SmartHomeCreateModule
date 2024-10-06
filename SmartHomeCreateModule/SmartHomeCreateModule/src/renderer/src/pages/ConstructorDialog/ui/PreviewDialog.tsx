import { IComponents } from '@renderer/entites/module/models/components'
import { WebConstructor } from 'alex-evo-web-constructor'
import { mapComponent } from '../../../entites/module/lib/helpers/mapComponents'
import { Button } from 'alex-evo-sh-ui-kit'

interface PreviewProps{
    page: IComponents | undefined | null
    title: string
}

export const PreviewDialog = ({page, title}:PreviewProps) => {

    if(!page)
        return (null)

    return(
        <div className={`dialog-container dialog-container-base`} style={{
            position: 'relative',
            transform: 'translate(-50%,0)'
        }}>
            <div className="dialog-header"><h2 className="text-3xl">{title}</h2></div>
            <div className="dialog-content">
            <WebConstructor 
                containerMenu={document.getElementById('menu-root')}
                containerModal={document.getElementById('modal-root')}
                data={mapComponent(page)}
            />
            </div>
            <div className="dialog-action">
                <Button>save</Button>
            </div>
        </div>
        
    )
}