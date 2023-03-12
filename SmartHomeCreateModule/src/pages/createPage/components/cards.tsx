import React, { PropsWithChildren, useEffect, useState } from "react";
import { ICard, ICards, ITextField, IType, TypeComponent, TypeContent } from "../../../store/reducers/moduleReducer";

interface Props {
	item: ICards
    update: (data:ITextField)=>void
}

export const Cards:React.FC<Props> = ({item}:Props) =>{

	return(
	    <div className={`base-card-container card-container `}>

        </div>
	)
}