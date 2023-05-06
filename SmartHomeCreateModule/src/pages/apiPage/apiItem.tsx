import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { useURL } from "../../hooks/useURL.hook";
import { IAPI, TypeRequest, UseElement } from "../../interfaces/api";

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
	const {validURL, getFullURL} = useURL()


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
    		<td>
				{
					(item.use === UseElement.BUTTON)?
					<i className="fa fa-hand-pointer"></i>:
					(item.use === UseElement.TABLE_BUTTON)?
					<><i className="fa fa-hand-pointer"></i><i className="fa fa-table"></i></>:
					(item.use === UseElement.TABLE)?
					<i className="fa fa-table"></i>:
					(item.use === UseElement.CARDS)?
					<i className="fas fa-window-maximize"></i>:
					(item.use === UseElement.TEXT)?
					<i className="">get text</i>:
					null
				}
			</td>
			<td>{JSON.stringify(item.useDitail)}</td>
    		<td><button className="btn" style={{background: "red"}} onClick={()=>del(index)}>delete</button></td>
		</tr>
	)
}