
import React, { useCallback, useEffect, useState } from "react"
import { useTypeSelector } from "../../../../hooks/useTypeSelector"
import { IButton, ICard, IDeviceCard, IOption, ITextField, TypeContent } from "../../../../store/reducers/moduleReducer"
import { getFullURL } from "../../../../utils"

interface Props {
	item: IDeviceCard
	update: (data:IDeviceCard)=>void
	del: ()=>void
}

export const DeviceCardConfig:React.FC<Props> = ({item, update, del}) => {

	const [title, setTytle] = useState<string>(item.title ?? "")
	const [option, setOption] = useState<IOption>(item.option ?? {})
    const module = useTypeSelector(state=>state.module)

	const changeSrc = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		setTytle(event.target.value)
		update({...item, src: event.target.value, option:option})
	},[item, option])

    const changeTitle=()=>{}

	return(
		<div>
            <div className="input-data">
				<select value={item.src} onChange={changeSrc}>
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