import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Menu } from "../../components/menu";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { set_type } from "../../store/reducers/choiseTypeReducer";
import { ITextField, IType, set_module, TypeComponent } from "../../store/reducers/moduleReducer";
import { CreatePageComponents } from "./components";
import { getNewData } from "./utils";

export const CreatePage:React.FC = () =>{

	const dispatch = useDispatch()
	const searchType = useTypeSelector(state=>state.searchType)
	const module = useTypeSelector(state=>state.module)

	useEffect(()=>{
		console.log(module)
	},[module])

	const clickContainer = (e:any, typeContainer:string) => {
		console.log(e.target)
		if (!searchType.type) return
		dispatch(set_type({type: null}))
		if(e.target?.dataset?.container === "root")
		{
			let newData = module.module
			newData.push(getNewData(searchType.type))
			dispatch(set_module({...module, module: newData}))
		}
	}

	const update = (data: IType, index: number)=>{
		let newData =  module.module
		console.log(data, index)
		newData[index] = data
		console.log(data, index)
		dispatch(set_module({...module, module: newData}))
	}

	return(
		<>
			<Menu/>
			<div className={`constructor-container ${(searchType.type)?"active":""}`}>
				<div className="root-container" data-el="container" data-container="root" onClick={(e)=>clickContainer(e, "root")}>
				{
					module.module.map((item, index)=>(
						<CreatePageComponents key={index} item={item} update={(data:IType)=>update(data, index)} index={String(index)}/>
					))
				}
				</div>
			</div>
		</>
	)
}