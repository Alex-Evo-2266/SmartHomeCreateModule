import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "../../../components/table/table";
import { showCreateTablePage } from "../../../store/reducers/createTable";
import { ITable, ITextField, IType, TypeComponent, TypeContent } from "../../../store/reducers/moduleReducer";

interface Props {
	item: ITable
    update: (data:ITable)=>void
    del: ()=>void
}

export const TableComponent:React.FC<Props> = ({item, update, del}:Props) =>{

    const dispatch = useDispatch()

    const configDialog = useCallback(() => {
        dispatch(showCreateTablePage({table:item, update:(data:ITable)=>{
            update(data)
        }}))
        // dispatch(showDialog({type: DialogType.CASTOM, title: "edit component", html: <TableConfig update={update} item={item} del={()=>{
		// 	dispatch(showDialog({type: DialogType.ALERT, title: "delete component", callback: ()=>{
		// 		del()
		// 	}}))
		// }}/>}))
    },[item])

    const getStyle = (item: ITextField) => {
        let data: React.CSSProperties = {
            fontSize: item.option?.fontSize ?? 20,
            borderRadius: item.option?.borderRadius ?? 0
        }
        return data
    }

    const getText = (text: string) => {
        return text.split('\n')
    }

	return(
        <div className="component-table" onClick={configDialog} >
            <Table col={item.cols} items={item.items ?? []}/>
        </div>
    )
}