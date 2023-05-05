import React from 'react'
import { colTable, IItemTable } from '../../interfaces/table'
import { TableCell } from './tableCell'

interface Props {
	col: colTable[]
	items: IItemTable[]
}

export const Table:React.FC<Props> = ({col, items}:Props)=>{

	// col=[{
	// 	title: "",
	// 	type: "",
	//  name: ""
	// }]

	// items=[{
	// 	data:{},
	// 	action: bool,
	// 	onClick: ()=>{}
	// }]
	console.log("p0", col, items)

	if (!Array.isArray(col) || ((typeof col[0] !== 'string') && (!col[0].title || !col[0].name)) || !Array.isArray(items))
		throw new Error("table: invalid input data")

	// if (items.length === 0)
	// 	return null

	console.log(items, col)
	
	const headList = ()=>{
		const arr = col.slice()
		if (items.length > 0 && typeof(items[0].onClick)==="function")
			arr.unshift("__check")
		return (arr)
	}

	const clickCel = (item:IItemTable) => {
		if (item.onClick && typeof(item.onClick)==="function")
			item?.onClick(item.data)
	}
	

	return(
		<div className = {`table-box`}>
			<table>
				<thead>
					<tr>
					{
						headList().map((item, index)=>{
							if (index === 0 && item === "__check")
								return(<th key={index} className="__check"></th>)
							if (typeof(item)==="object")
								return(<th key={index}>{item.title}</th>)
							return(<th key={index}>{item}</th>)
						})
					}
					</tr>
				</thead>
				<tbody>
				{
					items.map((item, index)=>(
						<tr key={index} className={`${(item.action)?"active":""}`} onClick={()=>clickCel(item)}>
							{
								(typeof(item.onClick)==="function")?
								<td className="__check">
								{
									(item.action)?
									<i className="fas fa-check-circle"></i>:
									<i className="fas fa-times-circle"></i>
								}
								</td>:null
							}
							{
								col.map((item2, index2)=>(
									<TableCell key={index2} col={item2} item={item}/>
								))
							}
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}
