import React, { PropsWithChildren, useEffect, useState } from "react";
import { ICards, ITextField } from "../../../interfaces/otherComponents";

interface Props {
	item: ICards
    update: (data:ITextField)=>void
	del: ()=>void
}

export const Cards:React.FC<Props> = ({item, del}:Props) =>{

	return(
	    <div className={`base-card-container card-container `}>

        </div>
	)
}