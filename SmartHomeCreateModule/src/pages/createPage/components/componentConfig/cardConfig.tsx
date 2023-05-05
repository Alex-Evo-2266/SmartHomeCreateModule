
import React, { useCallback, useState } from "react"
import { ICard } from "../../../../interfaces/otherComponents"
import { IOption } from "../../../../interfaces/componentOption"

interface Props {
	item: ICard
	update: (data:ICard)=>void
	del: ()=>void
}

export const CardConfig:React.FC<Props> = ({item, update, del}) => {

	const [title, setTytle] = useState<string>(item.title ?? "")
	const [option, setOption] = useState<IOption>(item.option ?? {})

	const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setTytle(event.target.value)
		update({...item, title: event.target.value, option:option})
	},[item, option])

	const changeRadius = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		let option_data: IOption = option ?? {}
		option_data.borderRadius = Number(event.target.value)
		setOption(prev=>({...prev, borderRadius:Number(event.target.value)}))
		update({...item, option: option_data, title: title})
	},[item, option, title])

	const changeSize = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		let option_data: IOption = option ?? {}
		option_data.fontSize = Number(event.target.value)
		setOption(prev=>({...prev, fontSize:Number(event.target.value)}))
		update({...item, option: option_data, title: title})
	},[item, option, title])

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
			<button className="btn red" style={{background: "red"}} onClick={()=>del()}>delete</button>
		</div>
	)
}