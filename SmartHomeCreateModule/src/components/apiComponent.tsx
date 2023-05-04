
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAPI } from "../hooks/useAPI.hook"
import { useTypeSelector } from "../hooks/useTypeSelector"
import { useURL } from "../hooks/useURL.hook"
import { IButton, IOption, ITextField, set_module, TypeComponent, TypeContent, UseElement } from "../store/reducers/moduleReducer"

interface Props {
	value: string | undefined,
    onChange: (event:React.ChangeEvent<HTMLSelectElement>)=>void
    typeUse: UseElement
}

export const SelectAPI:React.FC<Props> = ({value, onChange, typeUse}) => {

	const {getFullURL} = useURL()
	const {getAPITypeGet, getAPI} = useAPI()

	const changeUrl = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const oldURL = getAPI(value)
        if(oldURL)
        {
            oldURL.data.use = undefined
            oldURL.save()
        }
        const newURL = getAPI(event.target.value)
        if(newURL)
        {
            newURL.data.use = typeUse
            newURL.save()
        }
        onChange(event)
	},[])

	return(
        <>
		<select className="color-normal" value={value} onChange={changeUrl} style={{width: "100%"}}>
			<option value={""}></option>
			{
			    getAPITypeGet(value).map((item, index)=>(
					<option key={index} value={item.url}>{getFullURL(item.url)}</option>
				))
		    }
		</select>
        </>
	)
}