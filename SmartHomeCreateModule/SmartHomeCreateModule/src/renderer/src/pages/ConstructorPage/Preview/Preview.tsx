import { IComponents } from '@renderer/entites/module/models/components'
import './Preview.scss'
import { WebConstructor } from 'alex-evo-web-constructor'
import { mapComponent } from './mapComponents'

interface PreviewProps{
    page: IComponents | undefined | null
}

export const Preview = ({page}:PreviewProps) => {

    if(!page)
        return (null)

    return(
        <WebConstructor 
            containerMenu={document.getElementById('menu-root')}
            containerModal={document.getElementById('modal-root')}
            data={mapComponent(page)}
        />
    )
}