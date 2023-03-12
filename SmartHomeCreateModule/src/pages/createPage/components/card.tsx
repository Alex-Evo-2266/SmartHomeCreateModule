import React, { PropsWithChildren, useEffect, useState } from "react";
import { ICard, ITextField, IType, TypeComponent, TypeContent } from "../../../store/reducers/moduleReducer";

interface Props {
	item: ICard
    update: (data:ITextField)=>void
}

export const Card:React.FC<Props> = ({item}:Props) =>{

	return(
	    <div className={`base-card-container card-container `}>

        </div>
	)
}