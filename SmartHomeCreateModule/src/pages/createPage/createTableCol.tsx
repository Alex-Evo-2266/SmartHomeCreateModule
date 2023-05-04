

import React, { useCallback, useState } from "react";
import { IColTable, TypeColumn } from "../../interfaces/table";

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

    const [title, setTytle] = useState<string>(item.title ?? "")
	const [typeCol, setType] = useState<TypeColumn | undefined>(item.type ?? TypeColumn.BASE)
	const [url, setUrl] = useState<string | undefined>(item.action_url)

    const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setTytle(event.target.value)
        update({...item, title: event.target.value, type: typeCol, action_url:url})
	},[item, url, typeCol, update])

    const changeType = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const data = TypeColumn[event.target.value as keyof typeof TypeColumn]
		setType(data)
        update({...item, title: title, type: data, action_url:url})
	},[item, title, url, update])

    const changeActionUrl = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value)
        update({...item, title: title, type: typeCol, action_url:event.target.value})
	},[item, title, typeCol, update])

    const deleteColumn = useCallback(() => {
        del()
    },[del])

	return(
		<tr>
            <td><input type="text" onChange={changeTitle} value={item.title}></input></td>
			<td>
			    <select className="color-normal" required name="name_module" onChange={changeType} value={getKeyTypeColumn(item.type)}>
					<option value={getKeyTypeColumn(TypeColumn.BASE)}>base</option>
					<option value={getKeyTypeColumn(TypeColumn.BUTTON)}>button</option>
					<option value={getKeyTypeColumn(TypeColumn.ICON)}>icon</option>
					<option value={getKeyTypeColumn(TypeColumn.BUTTON_ICON)}>button icon</option>
	    		</select>
			</td>
			<td>
				<input type="text" onChange={changeActionUrl} value={item.action_url} readOnly={!(item.type === TypeColumn.BUTTON || item.type === TypeColumn.BUTTON_ICON)}/>
			</td>
            <td><button className="btn" style={{background:"red"}} onClick={deleteColumn}>delete</button></td>
        </tr>
    )				
		
}