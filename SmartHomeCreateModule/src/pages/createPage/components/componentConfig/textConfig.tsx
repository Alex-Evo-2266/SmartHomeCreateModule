
import React, { useCallback, useState } from "react"
import { IOption } from "../../../../interfaces/componentOption"
import { ITextField, TypeContent } from "../../../../interfaces/otherComponents"
import { SelectAPI } from "../../../../components/apiComponent"
import { UseElement } from "../../../../interfaces/api"
import { useAPI } from "../../../../hooks/useAPI.hook"

interface Props {
	item: ITextField
	update: (data:ITextField)=>void
	del: ()=>void
}

export const TextConfig:React.FC<Props> = ({item, update, del}) => {

	const [value, setValue] = useState<string>(item.value ?? "")
	const [option, setOption] = useState<IOption>(item.option ?? {})
	const [type, setType] = useState<TypeContent>(item.type_content)
	const [url, setUrl] = useState<string>(item.url ?? "")

	const {getAPI} = useAPI()

	const changeLabel = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
		setValue(event.target.value)
		update({...item, value: event.target.value, option:option, type_content: type, url})
	},[item, option, type, update, url])

	const changeURL = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
		setUrl(event.target.value)
		update({...item, value: value, option:option, type_content: type, url: event.target.value})
	},[item, option, type, update, value])

	const changeSize = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		let option_data: IOption = option ?? {}
		option_data.fontSize = Number(event.target.value)
		setOption(prev=>({...prev, fontSize:Number(event.target.value)}))
		update({...item, option: option_data, value:value, type_content: type, url})
	},[item, option, type, value, update, url])

	const changeRadius = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		let option_data: IOption = option ?? {}
		option_data.borderRadius = Number(event.target.value)
		setOption(prev=>({...prev, borderRadius:Number(event.target.value)}))
		update({...item, option: option_data, value:value, type_content: type, url})
	},[item, option, type, value, update, url])

	const changeType = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		let data = TypeContent.TEXT
		if (event.target.value === TypeContent.LOAD)
		{
			data = TypeContent.LOAD
			const API = getAPI(url)
			if (API)
			{
				API.data.useDitail = undefined
				API.data.use = undefined
				API.save()
			}
		}
		setType(data)
		update({...item, option: option, value:value, type_content: data, url})
	},[item, option, value, update, url])

	return(
		<div>
			<div className="input-data">
				<span>type  </span>
				<select className="color-normal-v2" required name="name_module" onChange={changeType} value={type}>
					<option value={TypeContent.TEXT}>text</option>
					<option value={TypeContent.LOAD}>url</option>
				</select>
			</div>
			<div className="">
				<p>border radius {option.borderRadius}</p>
				<input className="color-normal-v2" required type="range" min={0} max={10} name="name_module" onChange={changeRadius} value={Number(option.borderRadius ?? 0)}/>
			</div>
			<div className="input-data">
				<span>font-size  </span>
				<select className="color-normal-v2" required name="name_module" onChange={changeSize} value={Number(option.fontSize ?? 0)}>
					<option value={10}>10</option>
					<option value={12}>12</option>
					<option value={14}>14</option>
					<option value={16}>16</option>
					<option value={18}>18</option>
					<option value={20}>20</option>
					<option value={22}>22</option>
					<option value={24}>24</option>
					<option value={26}>26</option>
				</select>
			</div>
			{
				(type === TypeContent.TEXT)?
				<div className="input-data area">
					<textarea className="color-normal-v2" required name="name_module" onChange={changeLabel} placeholder="Label" value={value}/>
				</div>:
				<div className="input-data area">
				<SelectAPI value={url} onChange={changeURL} typeUse={UseElement.TEXT}/>
				</div>
			}
			<button className="btn red" style={{background: "red"}} onClick={()=>del()}>delete</button>
		</div>
	)
}