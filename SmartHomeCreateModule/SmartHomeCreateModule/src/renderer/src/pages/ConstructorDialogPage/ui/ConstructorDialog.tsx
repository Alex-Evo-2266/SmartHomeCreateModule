import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { ConstructorPanel } from '../../../widgets/ConstructorPanel/ConstructorPanel'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo } from 'react'
import { IComponents } from '@renderer/entites/module/models/components'
import { setDialogModule } from '@renderer/entites/module/lib/reducers/moduleReducer'
import { PreviewDialog } from './PreviewDialog'
import { IDialog } from '@renderer/entites/module/models/pageModel'

export const ConstructorDialog:React.FC = () => {

    const {dialog: dialogs} = useAppSelector(state=>state.module)
    const {index} = useParams()
    const dialog = useMemo<IDialog | undefined | null>(()=>index && dialogs[index], [index, dialogs])
    const dispatch = useAppDispatch()

    const changeHandler = useCallback((data: IComponents | undefined | null) => {
        if(!index) return;
        let arrPages = dialogs.slice()
        arrPages[index] = {...arrPages[index], components: data}
        console.log(arrPages)
        dispatch(setDialogModule(arrPages))
    },[dispatch, index, dialogs])

    useEffect(()=>{
        console.log(dialog)
    },[dialog])

    return(
        <div>
            <ConstructorPanel component={dialog?.components} onChange={changeHandler}/>
            <PreviewDialog page={dialog?.components} title={dialog?.name ?? ""}/>
        </div>
    )
}