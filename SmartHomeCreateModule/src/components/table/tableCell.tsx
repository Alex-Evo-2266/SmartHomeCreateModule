import React from 'react'
import { colTable, IItemTable, TypeColumn } from '../../interfaces/table'

interface Props {
	col: colTable
	item: IItemTable
}

export const TableCell = ({col, item}:Props)=>{
	
	if (typeof col === "string")
		return null

	const dataCel = item.data[col.name]
	

	if (typeof(dataCel) === "string" && col.type === TypeColumn.ICON)
		return(
			<td>
				<i className={dataCel}></i>
			</td>
		)

	if (typeof(dataCel) === "string")
		return(
			<td>
				{dataCel}
			</td>
		)

	if (col.type === "icon")
		return(
			<td className='center' style={{color:dataCel?.color ?? "white"}}>
				<i className={dataCel?.title ?? ""}></i>
			</td>
			)
	if (col.type === "btn")
		return(
			<td style={{color:dataCel?.color ?? "white"}}>
				{
					(!dataCel?.onClick)?
					dataCel.title:
					<button className='btn' onClick={dataCel.onClick}>{dataCel.title}</button>
				}	
			</td>
			)
	if (col.type === "btn-icon")
		return(
			<td className='center' style={{color:dataCel?.color ?? "white", cursor: "pointer"}}>
				{
					(!dataCel.onClick)?
					dataCel.title:
					<i className={dataCel.title} onClick={dataCel.onClick}></i>
				}	
			</td>
			)
	return(
		<td style={{color:dataCel?.color ?? "white"}}>
			{dataCel.title}
		</td>
	)
}
