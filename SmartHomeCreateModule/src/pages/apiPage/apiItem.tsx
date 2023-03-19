import React, { DOMElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { IAPI, set_module, TypeRequest } from "../../store/reducers/moduleReducer";
import { getFullURL, validURL } from "../../utils";

interface Props{
    item: IAPI
    index: number
    changeName: (e:React.ChangeEvent<HTMLInputElement>, index: number)=>void
    changeURL: (e:React.ChangeEvent<HTMLInputElement>, index: number)=>void
    changeType: (e:React.ChangeEvent<HTMLSelectElement>, index:number)=>void
    del: (index:number)=>void
}

export const APIItem:React.FC<Props> = ({item, index, changeName, changeType, changeURL, del}) =>{

	const dispatch = useDispatch()
	const module = useTypeSelector(state=>state.module)
    const [fokus, setFocus] = useState<boolean>(false)

	return(
		<tr>
			<td><input className={`${(item.name === "")?"fail":""}`} type="text" value={item.name} onChange={(e)=>changeName(e, index)}/></td>
			<td><input type="text" className={`${(validURL(item.url))?"":"fail"}`} value={(fokus)?item.url:getFullURL(item.url)} onChange={(e)=>changeURL(e, index)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}/></td>
			<td>
				<select value={item.type} onChange={(e)=>changeType(e, index)}>
					<option value={TypeRequest.GET}>GET</option>
					<option value={TypeRequest.POST}>POST</option>
				</select>
			</td>
    		<td></td>
    		<td><button className="btn" style={{background: "red"}} onClick={()=>del(index)}>delete</button></td>
		</tr>
	)
}