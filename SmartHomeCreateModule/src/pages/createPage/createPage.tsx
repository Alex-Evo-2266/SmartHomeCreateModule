import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { Menu } from "../../components/menu";
import { usePage } from "../../hooks/usePage";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { set_type } from "../../store/reducers/choiseTypeReducer";
import { IModuleState, ITextField, IType, set_module, TypeComponent } from "../../store/reducers/moduleReducer";
import { CreatePageComponents } from "./components";
import { getNewData } from "./utils";

export const CreatePage:React.FC = () =>{

	const dispatch = useDispatch()
	const searchType = useTypeSelector(state=>state.searchType)
	const {name} = useParams()
	const pages = usePage()

	useEffect(()=>{
		console.log(module)
	},[module])

	const clickContainer = (e:any, typeContainer:string) => {
		if (!searchType.type) return
		if(e.target?.dataset?.container === "root")
		{
			let newData = pages.getPage(name)
			if (!newData) return
			newData.page.push(getNewData(searchType.type))
			dispatch(set_type({type: null}))
			pages.setPage(name, newData)
		}
	}

	const update = (data: IType, index: number)=>{
		let newData = pages.getPage(name)
		if (!newData) return
		newData.page[index] = data
		pages.setPage(name, newData)
	}

	const deleteChild = (index:number) => {
		let newData = pages.getPage(name)
		if (!newData) return
        newData.page = newData.page.filter((_, index2)=>index2!==index)
		pages.setPage(name, newData)
		}


	return(
		<>
			<Menu/>
			<div className={`constructor-container ${(searchType.type)?"active":""}`}>
				<div className="root-container" data-el="container" data-container="root" onClick={(e)=>clickContainer(e, "root")}>
				{
					pages.getPage(name)?.page.map((item, index)=>(
						<CreatePageComponents key={index} item={item} update={(data:IType)=>update(data, index)} index={String(index)} del={()=>deleteChild(index)}/>
					))
				}
				</div>
			</div>
		</>
	)
}