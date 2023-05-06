

import React, { useCallback } from "react";
import { IColTable, TypeColumn } from "../../interfaces/table";
import { UseElement } from "../../interfaces/api";
import { SelectAPI } from "../../components/apiComponent";
import { useAPI } from "../../hooks/useAPI.hook";

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

export const CreateTableCol:React.FC<Props> = ({item, update, del}) =>{

	const {getAPI} = useAPI()

	const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        update({...item, [event.target.name]: event.target.value})
	},[item, update])

	const changeActionUrl = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		if (item.type === TypeColumn.BUTTON || item.type === TypeColumn.BUTTON_ICON)
		{
			const API = getAPI(event.target.value)
			if (API)
			{
				API.data.useDitail = {
					value: "$index"
				}
				API.save()
			}
		}
        update({...item, action_url: event.target.value})
	},[item, update])

	const changeValue = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		if (item.type === TypeColumn.BUTTON || item.type === TypeColumn.BUTTON_ICON)
		{
			const API = getAPI(item.action_url)
			if (API)
			{
				API.data.useDitail = {
					value: event.target.value
				}
				API.save()
			}
		}
        update({...item, out_value: event.target.value})
	},[item, update])

    const changeType = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const data = TypeColumn[event.target.value as keyof typeof TypeColumn]
		let new_url = item.action_url
		if (data !== TypeColumn.BUTTON && data !== TypeColumn.BUTTON_ICON)
		{
			const API = getAPI(item.action_url)
			if (API)
			{
				new_url = ""
				API.data.useDitail = undefined
				API.data.use = undefined
				API.save()
			}
		}
        update({...item, type: data, action_url: new_url})
	},[item, update])

    const deleteColumn = useCallback(() => {
        del()
    },[del])

	return(
		<tr>
            <td><input type="text" name="name" onChange={changeHandler} placeholder="name" value={item.name}></input></td>
            <td><input type="text" name="title" onChange={changeHandler} placeholder="title" value={item.title}></input></td>
			<td>
			    <select className="color-normal" required name="name_module" onChange={changeType} value={getKeyTypeColumn(item.type)}>
					<option value={getKeyTypeColumn(TypeColumn.BASE)}>base</option>
					<option value={getKeyTypeColumn(TypeColumn.BUTTON)}>button</option>
					<option value={getKeyTypeColumn(TypeColumn.ICON)}>icon</option>
					<option value={getKeyTypeColumn(TypeColumn.BUTTON_ICON)}>button icon</option>
	    		</select>
			</td>
			<td>
				<SelectAPI value={item.action_url ?? ""} onChange={changeActionUrl} typeUse={UseElement.TABLE_BUTTON} disabled={!(item.type === TypeColumn.BUTTON || item.type === TypeColumn.BUTTON_ICON)}/>
			</td>
			<td>
				<select className="color-normal" required name="name_module" onChange={changeValue} value={item.out_value ?? "$index"} disabled={!(item.type === TypeColumn.BUTTON || item.type === TypeColumn.BUTTON_ICON)}>
					<option value={"$index"}>index</option>
	    		</select>
			</td>
            <td><button className="btn" style={{background:"red"}} onClick={deleteColumn}>delete</button></td>
        </tr>
    )				
		
}