
import React, { useCallback, useEffect, useState } from "react"
import { IColumns } from "../../../../interfaces/page"

interface Props {
	item: IColumns
	update: (data:IColumns)=>void
	del: ()=>void
}

export const ColumnsConfig:React.FC<Props> = ({item, update, del}) => {

	const [count, setCount] = useState<number>(item.count)

	const changeCount = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setCount(Number(event.target.value))
		update({...item, count: Number(event.target.value)})
	},[item])

	return(
		<div>
			<div className="input-data">
				<input className="color-normal-v2" required type="number" min={1} max={10} name="name_module" onChange={changeCount} value={Number(count)}/>
                <label>count column</label>
			</div>
			<button className="btn red" style={{background: "red"}} onClick={()=>del()}>delete</button>
		</div>
	)
}