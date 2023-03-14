import React, { PropsWithChildren, useEffect, useState } from "react";
import { IType, TypeComponent } from "../../store/reducers/moduleReducer";
import { Button } from "./components/buton";
import { Card } from "./components/card";
import { Cards } from "./components/cards";
import { Columns } from "./components/columns";
import { Text } from "./components/text";

export interface Props {
	item: IType
	update: (data:IType)=>void
	index: string
	del: ()=>void
}

export const CreatePageComponents:React.FC<Props> = ({item, update, index, del}:Props) =>{

	if (item.type === TypeComponent.TEXT)
		return(
			<Text item={item} update={update} del={del}/>
		)
	if (item.type === TypeComponent.LINK || item.type === TypeComponent.BUTTON)
		return(
			<Button item={item} update={update} del={del}/>
		)
	if (item.type === TypeComponent.CARD)
		return(
			<Card item={item} update={update} del={del}/>
		)
	if (item.type === TypeComponent.CARDS)
		return(
			<Cards item={item} update={update} del={del}/>
		)
	if (item.type === TypeComponent.COLUMNS)
		return(
			<Columns item={item} update={update} index={index} del={del}/>
		)
	return null
}