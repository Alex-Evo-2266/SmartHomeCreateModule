

import React, { useCallback } from "react";
import { IColTable, TypeColumn } from "../../interfaces/table";

interface Props {
	item: IColTable
}

export const ExamplesRow:React.FC<Props> = ({item}) =>{

	if(item.type === TypeColumn.BASE)
        return(<td>base taxt</td>)
        
    if(item.type === TypeColumn.BUTTON)
        return(<td><button className="btn">test button</button></td>)

    if(item.type === TypeColumn.ICON)
        return(<td><i className="fa fa-text-width"></i></td>)

    if(item.type === TypeColumn.BUTTON_ICON)
        return(<td><button><i className="fa fa-text-width"></i></button></td>)
		
    return(<td>base taxt</td>)
}