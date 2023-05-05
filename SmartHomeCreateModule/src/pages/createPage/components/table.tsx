import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Table } from "../../../components/table/table";
import { hideCreateTablePage, showCreateTablePage } from "../../../store/reducers/createTable";
import { ITable } from "../../../interfaces/tableInput";

interface Props {
	item: ITable
    update: (data:ITable)=>void
    del: ()=>void
}

export const TableComponent:React.FC<Props> = ({item, update, del}:Props) =>{

    const dispatch = useDispatch()

    const delTable = useCallback(()=>{
        dispatch(hideCreateTablePage())
        del()
    },[del, dispatch])

    const updatetable = useCallback((data:ITable)=>{
        update(data)
    },[update])

    const configDialog = useCallback(() => {
        dispatch(showCreateTablePage({table:item, update: updatetable, del: delTable}))
    },[item, dispatch, updatetable, delTable])

	return(
        <div className="component-table" onClick={configDialog} >
            <Table col={(item.cols.length === 0)?[{title:"NuN", name:"NuN"}]:item.cols} items={item.items ?? []}/>
        </div>
    )
}