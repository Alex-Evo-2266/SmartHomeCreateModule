import { IComponents } from '@renderer/entites/module/models/components'
import { WebConstructor } from 'alex-evo-web-constructor'
import { mapComponent } from '../../../entites/module/lib/helpers/mapComponents'
import { useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { mapDialog } from '../../../entites/module/lib/helpers/mapDialog'
import { useEffect } from 'react'

interface PreviewProps{
    page: IComponents | undefined | null
}

export const Preview = ({page}:PreviewProps) => {

    const {dialog, menu} = useAppSelector(state=>state.module)

    const fetchFunc = (...arg) => {
        console.log(arg)
    }

    useEffect(()=>{
        if(!page)
            return;
        console.log(mapComponent(page))
    },[page])

    if(!page)
        return (null)

    return(
        <div style={{overflowY: 'scroll'}}>
            <WebConstructor 
                fetchFunction={fetchFunc}
                containerMenu={document.getElementById('menu-root')}
                containerModal={document.getElementById('modal-root')}
                dialogs={dialog.map(item=>mapDialog(item))}
                menu={menu}
                data={mapComponent(page)}
            />
        </div>
        
    )
}