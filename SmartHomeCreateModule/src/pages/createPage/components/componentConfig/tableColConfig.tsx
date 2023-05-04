
import React, { useCallback, useEffect, useState } from "react"
import { SelectAPI } from "../../../../components/apiComponent"
import { IColTable, TypeColumn } from "../../../../interfaces/table"
import { IOption, ITable, ITextField, TypeContent, UseElement } from "../../../../store/reducers/moduleReducer"

interface Props {
	item: IColTable
	update: (data:IColTable)=>void
	del: ()=>void
}

const getKeyTypeColumn = (data: TypeColumn | undefined) => {
    if(data)
        return Object.keys(TypeColumn)[Object.values(TypeColumn).indexOf(data)]
    else
        return undefined
}

export const TableColConfig:React.FC<Props> = ({item, update, del}) => {

	const [title, setTytle] = useState<string>(item.title ?? "")
	const [typeCol, setType] = useState<TypeColumn | undefined>(item.type ?? TypeColumn.BASE)
	const [url, setUrl] = useState<string | undefined>(item.action_url)

    const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setTytle(event.target.value)
        update({...item, title: event.target.value, type: typeCol, action_url:url})
	},[item])

    const changeType = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const data = TypeColumn[event.target.value as keyof typeof TypeColumn]
		setType(data)
        update({...item, title: title, type: data, action_url:url})
	},[item])

    const changeActionUrl = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value)
        update({...item, title: title, type: typeCol, action_url:event.target.value})
	},[item])

   

	return(
		<div>
			<div className="input-data">
				<input className="color-normal-v2" type="text" required name="title" onChange={changeTitle} value={title}/>
				<label>title</label>
			</div>
            <div className="input-data big">
				<p>type</p>
				<select className="color-normal-v2" required name="name_module" onChange={changeType} value={getKeyTypeColumn(typeCol)}>
					<option value={getKeyTypeColumn(TypeColumn.BASE)}>base</option>
					<option value={getKeyTypeColumn(TypeColumn.BUTTON)}>button</option>
					<option value={getKeyTypeColumn(TypeColumn.ICON)}>icon</option>
					<option value={getKeyTypeColumn(TypeColumn.BUTTON_ICON)}>button icon</option>
				</select>
			</div>
            {
                (typeCol === TypeColumn.BUTTON || typeCol === TypeColumn.BUTTON_ICON)?
                <div className="input-data">
			    	<input className="color-normal-v2" type="text" required name="url" onChange={changeActionUrl} value={url}/>
				    <label>action_url</label>
			    </div>
                :null
            }
			<button className="btn red" style={{background: "red"}} onClick={()=>del()}>delete column</button>
		</div>
	)
}