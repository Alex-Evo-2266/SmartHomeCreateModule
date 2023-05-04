
import React, { useCallback, useEffect, useState } from "react"
import { SelectAPI } from "../../../../components/apiComponent"
import { IColTable } from "../../../../interfaces/table"
import { IOption, ITable, ITextField, TypeContent, UseElement } from "../../../../store/reducers/moduleReducer"
import { TableColConfig } from "./tableColConfig"

interface Props {
	item: ITable
	update: (data:ITable)=>void
	del: ()=>void
}

export const TableConfig:React.FC<Props> = ({item, update, del}) => {

	const [title, setTytle] = useState<string>(item.title ?? "")
	const [src, setSrc] = useState<string>(item.src ?? "")
	const [cols, setCols] = useState<IColTable[]>(item.cols ?? [])

    const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setTytle(event.target.value)
		update({...item, title: event.target.value, src: src, cols:cols})
	},[item, cols, src])

    const changeSrc = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		setSrc(event.target.value)
		update({...item, title: title, src: event.target.value, cols:cols})
	},[item, cols, title])

	const changeColumn = useCallback((data:IColTable, index:number)=>{
		const newColumn = item.cols
		newColumn[index] = data
		setCols(newColumn)
		console.log(data)
		update({...item, title: title, src: src, cols: newColumn})
	},[item, title, src])

	return(
		<div>
			<div className="input-data">
				<input className="color-normal-v2" type="text" required name="title" onChange={changeTitle} placeholder="Label" value={title}/>
				<label>title</label>
			</div>
            <div className="input-data">
				<SelectAPI value={src} onChange={changeSrc} typeUse={UseElement.TABLE}/>
			</div>
			<div className="column-config-container">
				<p>col</p>
				{
					item.cols.map((item, index)=>(
						<TableColConfig item={item} key={index} del={()=>{}} update={(data)=>changeColumn(data, index)}/>
					))
				}
			</div>
			
			<button className="btn red" style={{background: "red"}} onClick={()=>del()}>delete table</button>
		</div>
	)
}