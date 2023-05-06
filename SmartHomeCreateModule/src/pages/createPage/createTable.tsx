

import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectAPI } from "../../components/apiComponent";
import { IColTable, TypeColumn } from "../../interfaces/table";
import { hideCreateTablePage } from "../../store/reducers/createTable";
import { CreateTableCol } from "./createTableCol";
import { AlertType, show_alert } from "../../store/reducers/alertReducer";
import { ITable } from "../../interfaces/tableInput";
import { UseElement } from "../../interfaces/api";
import { ExamplesRow } from "./examplesTableRow";
import { useAPI } from "../../hooks/useAPI.hook";
import { useURL } from "../../hooks/useURL.hook";

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

const colsValid =  (cols: IColTable[]) => {
	for (let i = 0; i < cols.length; i++)
	{
		if(cols[i].name === "" || cols[i].title === "")
			return false
		for (let j = i + 1; j < cols.length; j++)
		{
			if (cols[i].name === cols[j].name)
				return false
		}
	}
	return true
}

export const CreateTable:React.FC<Props> = ({table, update, del}) =>{

	const dispatch = useDispatch()
	const {getAPI} = useAPI()
	const {validURL, getFullPageURL} = useURL()

	const [colsTable, setColstable] = useState<IColTable[]>(table.cols ?? [])
	const [title, setTitle] = useState<string>(table.title ?? "")
	const [tableDataSrc, setTableDataSrc] = useState<string>(table.src ?? "")
	
	const changeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
		update({...table, title: event.target.value, src:tableDataSrc, cols: colsTable})
	},[table, update, tableDataSrc, colsTable])

	const changeSrc = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const tableAPI = getAPI(event.target.value)
		if(tableAPI)
		{
			tableAPI.data.useDitail = {
				cols: colsTable,
				title: title
			}
			tableAPI.save()
		}
		setTableDataSrc(event.target.value)
		update({...table, src: event.target.value, title, cols: colsTable})
	},[table, update, title, colsTable, getAPI])

	const changeCol = useCallback((data:IColTable, index:number) => {
		let newdata = colsTable.slice()
		newdata[index] = data
		setColstable(newdata)
		update({...table, src: tableDataSrc, title, cols: newdata})
	},[table, update, tableDataSrc, colsTable, title])

	const delCol = useCallback((index:number) => {
		const newdata = colsTable.slice().filter((item, index1)=>index1 !== index)
		setColstable(newdata)
		update({...table, src: tableDataSrc, title, cols: newdata})
	},[table, update, tableDataSrc, colsTable, title])

	const addCol = useCallback(() => {
		let newdata = colsTable.slice()
		const newCol:IColTable = {
			name:"",
			title:"",
			type:TypeColumn.BASE
		}
		newdata.push(newCol)
		setColstable(newdata)
		update({...table, src: tableDataSrc, title, cols: newdata})
	},[table, update, tableDataSrc, colsTable, title])

	const save = () => {
		if(!colsValid(colsTable) || title === "")
		{
			dispatch(show_alert({title:"invalid entered data", type: AlertType.ERROR, text: "field uncorected fill"}))
		}
		else
			dispatch(hideCreateTablePage())
	}

	return(
		<div className={`container`}>
			<div className="create-table">
				<h4 className="color-normal">Title</h4>
				<div className="input-data">
					<input className={`color-normal ${(title === "")?"fail":""}`} type="text" required name="title" onChange={changeTitle} value={title}/>
					<label>title</label>
				</div>
				<h4 className="color-normal">Url</h4>
				<div className="input-data">
					<SelectAPI value={tableDataSrc} onChange={changeSrc} typeUse={UseElement.TABLE}/>
				</div>
				<div className="table-box">
					<table>
						<thead>
							<tr>
							{
								colsTable.map((item, index)=>(
									<th key={index}>{item.title}</th>
								))
							}
							</tr>
						</thead>
						<tbody>
							<tr>
							{
								colsTable.map((item, index)=>(
									<ExamplesRow key={index} item={item}/>
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
								<th>display name</th>
								<th>type</th>
								<th>url</th>
								<th>out value</th>
								<th>delete</th>
							</tr>
						</thead>
						<tbody>
							{
								colsTable.map((item, index)=>(
									<CreateTableCol item={item} key={index} update={(e)=>changeCol(e, index)} del={()=>delCol(index)}/>
								))
							}
							<tr><td><button className="btn" onClick={addCol}>add</button></td></tr>
						</tbody>
					</table>
				</div>
			</div>
			<button onClick={save} className="btn">save</button>
			<button onClick={del} className="btn border delete">delete</button>
		</div>
	)
}