
import React, { useCallback, useEffect, useState } from "react"
import { IButton, IOption, ITextField, TypeContent } from "../../../../store/reducers/moduleReducer"

interface Props {
	item: IButton
	update: (data:IButton)=>void
}

export const ButtonConfig:React.FC<Props> = ({item, update}) => {

	const [url, setUrl] = useState<string>(item.action_url ?? "")
	const [title, setTytle] = useState<string>(item.title ?? "")
	const [option, setOption] = useState<IOption>(item.option ?? {})

	const changeUrl = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value)
		update({...item, title: title, action_url: event.target.value, option:option})
	},[item, option, title])

	const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setTytle(event.target.value)
		update({...item, action_url: url, title: event.target.value, option:option})
	},[item, option, url])

	const changeRadius = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		let option_data: IOption = option ?? {}
		option_data.borderRadius = Number(event.target.value)
		setOption(prev=>({...prev, borderRadius:Number(event.target.value)}))
		update({...item, option: option_data, action_url: url, title: title})
	},[item, option, url, title])

	const changeSize = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		let option_data: IOption = option ?? {}
		option_data.fontSize = Number(event.target.value)
		setOption(prev=>({...prev, fontSize:Number(event.target.value)}))
		update({...item, option: option_data, action_url: url, title: title})
	},[item, option, url, title])

	return(
		<div>
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
			<div className="input-data">
				<input className="color-normal-v2" type="text" required name="name_module" onChange={changeTitle} placeholder="Label" value={title}/>
				<label>title</label>
			</div>
			<div className="input-data">
				<input className="color-normal-v2" type="text" required name="name_module" onChange={changeUrl} placeholder="Label" value={url}/>
				<label>url</label>
			</div>
		</div>
	)
}