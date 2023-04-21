
import React, { useCallback, useEffect, useState } from "react"
import { useTypeSelector } from "../../../../hooks/useTypeSelector"
import { useURL } from "../../../../hooks/useURL.hook"
import { IButton, ICard, IDeviceCard, IOption, ITextField, TypeContent } from "../../../../store/reducers/moduleReducer"

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

	const changeSrc = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		setURL(event.target.value)
		update({...item, src: event.target.value, option:option})
	},[item, option])

    const changeTitle=()=>{}

	return(
		<div>
            <div className="input-data">
				<select value={url} onChange={changeSrc}>
                    <option value={""}></option>
                    {
                        module.api.map((item2, index2)=>(
                            <option key={index2} value={item2.url}>{getFullURL(item2.url)}</option>
                        ))
                    }
                </select>
				<label>url</label>
			</div>
			<button className="btn red" style={{background: "red"}} onClick={()=>del()}>delete</button>
		</div>
	)
}