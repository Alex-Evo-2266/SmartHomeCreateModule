import React, { DOMElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { useURL } from "../../hooks/useURL.hook";
import { IAPI, IPage, set_module, TypeRequest } from "../../store/reducers/moduleReducer";

interface Props{
    item: IPage
    index: number
    changeName: (e:React.ChangeEvent<HTMLInputElement>, index: number)=>void
    changeURL: (e:React.ChangeEvent<HTMLInputElement>, index: number)=>void
    del: (index:number)=>void
}

export const PageItem:React.FC<Props> = ({item, index, changeName, changeURL, del}) =>{

	const {validURL, getFullPageURL} = useURL()
	const module = useTypeSelector(state=>state.module)
    const [fokus, setFocus] = useState<boolean>(false)

	return(
        <tr key={index}>
			<td><input className={`${(item.name === "")?"fail":""}`} type="text" value={item.name} onChange={(e)=>changeName(e, index)}/></td>
			<td><input type="text" className={`${(validURL(item.url))?"":"fail"}`} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} value={(fokus)?item.url:getFullPageURL(item.url)} onChange={(e)=>changeURL(e, index)}/></td>
			<td><Link className="btn" to={`/pages/createPage/${item.name}`}>edit</Link></td>
			<td><button className="btn" style={{background: "red"}} onClick={()=>del(index)}>delete</button></td>
		</tr>
	)
}