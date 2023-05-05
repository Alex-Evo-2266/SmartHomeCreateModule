

import React, { useCallback } from "react";
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

	const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        update({...item, [event.target.name]: event.target.value})
	},[item, update])

    const changeType = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const data = TypeColumn[event.target.value as keyof typeof TypeColumn]
        update({...item, type: data})
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
				<input type="text" name="action_url" onChange={changeHandler} value={item.action_url ?? ""} readOnly={!(item.type === TypeColumn.BUTTON || item.type === TypeColumn.BUTTON_ICON)}/>
			</td>
            <td><button className="btn" style={{background:"red"}} onClick={deleteColumn}>delete</button></td>
        </tr>
    )				
		
}