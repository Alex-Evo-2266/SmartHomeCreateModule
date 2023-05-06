
import React, { useCallback } from "react"
import { useAPI } from "../hooks/useAPI.hook"
import { useURL } from "../hooks/useURL.hook"
import { UseElement } from "../interfaces/api"

interface Props {
	value: string | undefined,
    onChange: (event:React.ChangeEvent<HTMLSelectElement>)=>void
    typeUse: UseElement
    disabled? :boolean | undefined
}

export const SelectAPI:React.FC<Props> = ({value, onChange, typeUse, disabled}) => {

	const {getFullURL} = useURL()
	const {getAPITypeGet, getAPI} = useAPI()

	const changeUrl = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const oldURL = getAPI(value)
        if(oldURL)
        {
            oldURL.data.use = undefined
            oldURL.data.useDitail = undefined
            oldURL.save()
        }
        const newURL = getAPI(event.target.value)
        if(newURL)
        {
            newURL.data.use = typeUse
            newURL.save()
        }
        onChange(event)
	},[getAPI, onChange, typeUse, value])

	return(
        <>
		<select className="color-normal" value={value} onChange={changeUrl} style={{width: "100%"}} disabled={disabled}>
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