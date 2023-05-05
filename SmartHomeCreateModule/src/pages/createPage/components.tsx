import React, { useCallback } from "react";
import { Button } from "./components/buton";
import { Card } from "./components/card";
import { Cards } from "./components/cards";
import { Columns } from "./components/columns";
import { DeviceCard } from "./components/devoiceCard";
import { TableComponent } from "./components/table";
import { Text } from "./components/text";
import { IType } from "../../interfaces/page";
import { TypeComponent } from "../../interfaces/typesComponent";

export interface Props {
	item: IType
	update: (data:IType, index:number)=>void
	index: number,
	id: string
	del: (index: number)=>void
}

export const CreatePageComponents:React.FC<Props> = ({item, update, index, id, del}:Props) =>{

	const updateComponent = useCallback((data: IType)=>{
		update(data, index)
	},[update, index])

	const deleteComponent = useCallback(()=>{
		del(index)
	},[del, index])

	if (item.type === TypeComponent.TEXT)
		return(
			<Text item={item} update={updateComponent} del={deleteComponent}/>
		)
	if (item.type === TypeComponent.LINK || item.type === TypeComponent.BUTTON)
		return(
			<Button item={item} update={updateComponent} del={deleteComponent}/>
		)
	if (item.type === TypeComponent.CARD)
		return(
			<Card item={item} update={updateComponent} del={deleteComponent}/>
		)
	if (item.type === TypeComponent.DEVICE_CARD)
		return(
			<DeviceCard item={item} update={updateComponent} del={deleteComponent}/>
		)
	if (item.type === TypeComponent.CARDS)
		return(
			<Cards item={item} update={updateComponent} del={deleteComponent}/>
		)
	if (item.type === TypeComponent.COLUMNS)
		return(
			<Columns item={item} update={updateComponent} id={id} del={deleteComponent}/>
		)
	if (item.type === TypeComponent.TABLE)
		return(
			<TableComponent item={item} update={updateComponent} del={deleteComponent}/>
		)
	return null
}