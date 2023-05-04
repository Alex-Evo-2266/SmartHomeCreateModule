

import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectAPI } from "../../components/apiComponent";
import { IColTable, TypeColumn } from "../../interfaces/table";
import { hideCreateTablePage } from "../../store/reducers/createTable";
import { ITable, UseElement } from "../../store/reducers/moduleReducer";
import { CreateTableCol } from "./createTableCol";

interface Props {
	table: ITable
	update: (data:ITable)=>void
	del: ()=>void
}

// const getKeyTypeColumn = (data: TypeColumn | undefined) => {
//     if(data)
//         return Object.keys(TypeColumn)[Object.values(TypeColumn).indexOf(data)]
//     else
//         return undefined
// }

export const CreateTable:React.FC<Props> = ({table, update, del}) =>{

	const [title, setTytle] = useState<string>(table.title ?? "")
	const [src, setSrc] = useState<string>(table.src ?? "")
	const [cols, setCols] = useState<IColTable[]>(table.cols ?? [])

	const dispatch = useDispatch()
	
	const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setTytle(event.target.value)
		update({...table, title: event.target.value, src: src, cols:cols})
	},[table, src, cols, update])

	const changeSrc = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		setSrc(event.target.value)
		update({...table, title: title, src: event.target.value, cols:cols})
	},[table, title, cols, update])

	const changeCol = useCallback((data:IColTable, index:number) => {
		console.log(index, cols)
		let newdata = cols.slice()
		newdata[index] = data
		console.log(index, cols, newdata)
		setCols(newdata)
		update({...table, title: title, src, cols:newdata})
	},[title, table, cols, src, update])

	const delCol = useCallback((index:number) => {
		console.log(index, cols)
		const newdata = cols.slice().filter((item, index1)=>index1 !== index)
		console.log(index, cols, newdata)
		setCols(newdata)
		update({...table, title: title, src:src, cols:newdata})
	},[title, table, cols, src, update])

	const addCol = useCallback(() => {
		let newdata = cols.slice()
		const newCol:IColTable = {
			name:"",
			title:"",
			type:TypeColumn.BASE
		}
		newdata.push(newCol)
		setCols(newdata)
		update({...table, title: title, src, cols:newdata})
	},[title, table, cols, src, update])

	const save = () => {
		dispatch(hideCreateTablePage())
	}

	return(
		<div className={`container`}>
			<div className="create-table">
				<h4 className="color-normal">Title</h4>
				<div className="input-data">
					<input className="color-normal" type="text" required name="title" onChange={changeTitle} value={title}/>
					<label>title</label>
				</div>
				<h4 className="color-normal">Url</h4>
				<div className="input-data">
					<SelectAPI value={src} onChange={changeSrc} typeUse={UseElement.TABLE}/>
				</div>
				<div className="table-box">
					<table>
						<thead>
							<tr>
							{
								cols.map((item, index)=>(
									<th key={index}>{item.title}</th>
								))
							}
							</tr>
						</thead>
						<tbody>
							<tr>
							{
								cols.map((_, index)=>(
									<td key={index}>test text</td>
								))
							}
							</tr>
						</tbody>
					</table>
				</div>
				<br/>
				<div>
					<table>
						<thead>
							<tr>
								<th>column</th>
								<th>type</th>
								<th>url</th>
								<th>delete</th>
							</tr>
						</thead>
						<tbody>
							{
								cols.map((item, index)=>(
									<CreateTableCol item={item} key={index} update={(e)=>changeCol(e, index)} del={()=>delCol(index)}/>
								))
							}
							<tr><td><button className="btn" onClick={addCol}>add</button></td></tr>
						</tbody>
					</table>
				</div>
			</div>
			<button onClick={save} className="btn">save</button>
			<button onClick={()=>{}} className="btn border delete">delete</button>
		</div>
	)
}