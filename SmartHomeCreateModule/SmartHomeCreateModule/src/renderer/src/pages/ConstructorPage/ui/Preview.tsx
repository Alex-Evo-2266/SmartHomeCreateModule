import { IComponents } from '@renderer/entites/module/models/components'
import { WebConstructor } from 'alex-evo-web-constructor'
import { mapComponent } from '../../../entites/module/lib/helpers/mapComponents'
import { useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { mapDialog } from '../../../entites/module/lib/helpers/mapDialog'

interface PreviewProps{
    page: IComponents | undefined | null
}

export const Preview = ({page}:PreviewProps) => {

    const {dialog} = useAppSelector(state=>state.module)

    const fetchFunc = (...arg) => {
        console.log(arg)
    }

    if(!page)
        return (null)

    return(
        <WebConstructor 
            fetchFunction={fetchFunc}
            containerMenu={document.getElementById('menu-root')}
            containerModal={document.getElementById('modal-root')}
            dialogs={dialog.map(item=>mapDialog(item))}
            data={mapComponent(page)}
        />
    )
}