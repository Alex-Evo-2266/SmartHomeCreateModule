import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { set_type } from "../../../store/reducers/choiseTypeReducer";
import { DialogType, showDialog } from "../../../store/reducers/dialogReducer";
import { CreatePageComponents } from "../components";
import { getNewData } from "../utils";
import { ColumnsConfig } from "./componentConfig/colummnsConfig";
import { IColumns, IType } from "../../../interfaces/page";

interface Props {
	item: IColumns
    update: (data:IColumns)=>void
    id: string
    del:()=>void
}

const minWidth: React.CSSProperties = {
    flexDirection: "column"
}

const normalWidth: React.CSSProperties = {
    flexDirection: "row"
}

export const Columns:React.FC<Props> = ({item, update, id, del}:Props) =>{

    const dispatch = useDispatch()
	const searchType = useTypeSelector(state=>state.searchType)
    const columns = useRef<HTMLDivElement | null>(null)
    const [flexStyle, setFlexStyle] = useState<React.CSSProperties>(normalWidth)
    

    const clickContainer = (e:any, index2: number) => {
		if (!searchType.type) return
        if (e.target.dataset.container !== `columns-${id}`) return
		let newData = item.value
		newData.push({indexCol: index2, value: getNewData(searchType.type)})
        dispatch(set_type({type: null}))
		update({...item, value:newData})
	}

    const configDialog = useCallback((e: any) => {
        if (e.target.dataset.container !== `columns-${id}`) return false
        dispatch(showDialog({type: DialogType.CASTOM, title: "edit component", html: <ColumnsConfig update={update} item={item} del={()=>{
			dispatch(showDialog({type: DialogType.ALERT, title: "delete component", callback: ()=>{
				del()
			}}))
		}}/>}))
        return false
    },[item, del, dispatch, id, update])

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
    },[])

    const deleteChild = (index:number) => {
        let newData = item.value.filter((_, index2)=>index2!==index)
        update({...item, value: newData})
    }

    useEffect(()=>{
        window.addEventListener("resize", setStyle)
        return ()=>{
            window.removeEventListener("resize", setStyle)
        }
    },[setStyle])

	return(
        <div ref={columns} className="columns-container" data-container={`columns-${id}`} style={flexStyle} onContextMenu={configDialog}>
            {
                new Array(item.count).fill(0).map((_, index1)=>(
                    <div key={index1} className="col-container" data-el="container" data-container={`columns-${id}`} onClick={(e)=>clickContainer(e, index1)}>
                    {
                        getContent(index1).map((item2, index2)=>(
                            <CreatePageComponents key={index2} item={item2.item} update={updateChild} index={item2.index} id={`${id}-${String(item2.index)}`} del={deleteChild}/>
                        ))
                    }
                    </div>
                ))
            }
        </div>
	)
}