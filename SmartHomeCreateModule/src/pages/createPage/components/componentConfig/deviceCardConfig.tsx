
import React, { useCallback, useEffect, useState } from "react"
import { useAPI } from "../../../../hooks/useAPI.hook"
import { useTypeSelector } from "../../../../hooks/useTypeSelector"
import { useURL } from "../../../../hooks/useURL.hook"
import { IDeviceCard } from "../../../../interfaces/otherComponents"
import { IOption } from "../../../../interfaces/componentOption"
import { SelectAPI } from "../../../../components/apiComponent"
import { UseElement } from "../../../../interfaces/api"

interface Props {
	item: IDeviceCard
	update: (data:IDeviceCard)=>void
	del: ()=>void
}

export const DeviceCardConfig:React.FC<Props> = ({item, update, del}) => {

	const [url, setURL] = useState<string>(item.src ?? "")
	const [option, setOption] = useState<IOption>(item.option ?? {})
	const module = useTypeSelector(state=>state.module)
	const {getFullURL} = useURL()
	const {getAPITypeGet} = useAPI()

	const changeSrc = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		setURL(event.target.value)
		update({...item, src: event.target.value, option:option})
	},[item, option])

	const changeTitle=()=>{}

	return(
		<div>
			<div className="input-data">
				<SelectAPI value={url} onChange={changeSrc} typeUse={UseElement.CARDS}/>
			</div>
			<button className="btn red" style={{background: "red"}} onClick={()=>del()}>delete</button>
		</div>
	)
}