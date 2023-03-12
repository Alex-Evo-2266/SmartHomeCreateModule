import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { set_type } from "../../../store/reducers/choiseTypeReducer";
import { ICard, ICards, IColumns, ITextField, IType, set_module, TypeComponent, TypeContent } from "../../../store/reducers/moduleReducer";
import { CreatePageComponents } from "../components";
import { getNewData } from "../utils";

interface Props {
	item: IColumns
    update: (data:IColumns)=>void
    index: string
}

interface ColItem {
    item: IType
    index: number
    indexCol: number
}

const minWidth: React.CSSProperties = {
    flexDirection: "column"
}

const normalWidth: React.CSSProperties = {
    flexDirection: "row"
}

export const Columns:React.FC<Props> = ({item, update, index}:Props) =>{

    const dispatch = useDispatch()
	const searchType = useTypeSelector(state=>state.searchType)
    const columns = useRef<HTMLDivElement | null>(null)
    const [flexStyle, setFlexStyle] = useState<React.CSSProperties>(normalWidth)
    

    const clickContainer = (e:any, index2: number) => {
		if (!searchType.type) return
        if (e.target.dataset.container !== `columns-${index}`) return
		dispatch(set_type({type: null}))
		let newData = item.value
		newData.push({indexCol: index2, value: getNewData(searchType.type)})
		update({...item, value:newData})
	}

    const updateChild = (data: IType, index: number) => {
        let newData = item.value
        newData[index].value = data
        update({...item, value: newData})
    }

    const getContent = (indexCol: number) => {
        return item.value
            .map((item2, index)=>({item: item2.value, index, indexCol:item2.indexCol}))
            .filter(item2=>item2.indexCol === indexCol)
    }

    const setStyle = useCallback(() => {
        if (columns.current)
        {
            let param = columns.current.getBoundingClientRect()
            if (param.width < 300)
            {
                setFlexStyle(minWidth)
            }
            else
                setFlexStyle(normalWidth)
        }
    },[columns.current])

    useEffect(()=>{
        window.addEventListener("resize", setStyle)
        return ()=>{
            window.removeEventListener("resize", setStyle)
        }
    },[columns.current, setStyle])

	return(
        <div ref={columns} className="columns-container" style={flexStyle}>
            {
                new Array(item.count).fill(0).map((_, index1)=>(
                    <div key={index1} className="col-container" data-el="container" data-container={`columns-${index}`} onClick={(e)=>clickContainer(e, index1)}>
                    {
                        getContent(index1).map((item2, index2)=>(
                            <CreatePageComponents key={index2} item={item2.item} update={(data)=>updateChild(data, item2.index)} index={`${index}-${String(item2.index)}`}/>
                        ))
                    }
                    </div>
                ))
            }
        </div>
	)
}