
import { setDeviceModule } from "@renderer/entites/module/lib/reducers/moduleReducer"
import { useAppDispatch, useAppSelector } from "@renderer/shared/lib/hooks/redux"
import { FAB, EmptyPage } from 'alex-evo-sh-ui-kit'
import { useCallback, useState } from "react"
import { Navigation } from "@renderer/widgets/Navigation"
import { AddDeviceDialog } from '@renderer/features/AddDeviceDialog'
import { DeviceCard } from "@renderer/widgets/DeviceCard"
import { IDevice } from '@renderer/entites/module/models/device'


export const DevicesPage = () => {

    const {devices} = useAppSelector(state=>state.module)
    const dispatch = useAppDispatch()
    const [addPageCArdVisible, setAddPageCardVisible] = useState<boolean>(false)

    const deleteHandler = useCallback((index:number) => {
        dispatch(setDeviceModule(devices.filter((_, indexDevices)=>indexDevices !== index)))
    },[devices, dispatch])

    const editHandler = (item: IDevice, index: number) => {
        
    }

    return(
        <>
		<Navigation/>
        <div className="page-container">
            {
                (devices.length > 0)?
                devices.map((item, index)=>(
                    <DeviceCard key={`device-${index}`} data={item} onDelete={()=>deleteHandler(index)} onEdit={()=>editHandler(item, index)}/>
                )):
                <EmptyPage btn={{
                    text: "create",
                    onClick: ()=>setAddPageCardVisible(true)
                }} title="The device have not been created yet" hexColor="#FFF" style={{margin: "0",height: "100dvh"}}/>
            }
        </div>
        <FAB onClick={()=>setAddPageCardVisible(true)} className="fab-in-page">+</FAB>
        {addPageCArdVisible && 
            <AddDeviceDialog onHide={()=>setAddPageCardVisible(false)} onCreate={(data)=>{
                let dialog = devices.slice()
                dialog.push(data)
                dispatch(setDeviceModule(dialog))
                setAddPageCardVisible(false)
            }}/>
        }
        </>
    )
}