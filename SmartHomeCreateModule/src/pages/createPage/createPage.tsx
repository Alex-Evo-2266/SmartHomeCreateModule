import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Menu } from "../../components/menu";
import { usePage } from "../../hooks/usePage";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { set_type } from "../../store/reducers/choiseTypeReducer";
import { CreatePageComponents } from "./components";
import { CreateTable } from "./createTable";
import { getNewData } from "./utils";
import { IType } from "../../interfaces/page";

export const CreatePage:React.FC = () =>{

	const dispatch = useDispatch()
	const searchType = useTypeSelector(state=>state.searchType)
	const createTablePage = useTypeSelector(state=>state.createTable)
	const {name} = useParams()
	const {getPage, setPage} = usePage()

	const clickContainer = useCallback((e:any, typeContainer:string) => {
		console.log(searchType)
		if (!searchType.type) return
		if(e.target?.dataset?.container === "root")
		{
			let newData = getPage(name)
			if (!newData) return
			newData.page.push(getNewData(searchType.type))
			dispatch(set_type({type: null}))
			setPage(name, newData)
		}
	},[setPage, getPage, searchType, dispatch, name])

	const update = useCallback((data: IType, index: number)=>{
		let newData = getPage(name)
		if (!newData) return
		newData.page[index] = data
		setPage(name, newData)
	},[name, getPage, setPage])

	const deleteChild = useCallback((index:number) => {
		let newData = getPage(name)
		if (!newData) return
        newData.page = newData.page.filter((_, index2)=>index2!==index)
		setPage(name, newData)
	},[name, setPage, getPage])


	return(
		<>
			{
				(createTablePage.visible && createTablePage.table)?
				<CreateTable table={createTablePage.table} update={createTablePage.update} del={createTablePage.del}/>:
				<>
				<Menu/>
				<div className={`constructor-container ${(searchType.type)?"active":""}`}>
					<div className="root-container" data-el="container" data-container="root" onClick={(e)=>clickContainer(e, "root")}>
					{
						getPage(name)?.page.map((item, index)=>(
							<CreatePageComponents key={index} item={item} update={update} index={index} id={String(index)} del={deleteChild}/>
						))
					}
					</div>
				</div>
				</>
			}
		</>
	)
}