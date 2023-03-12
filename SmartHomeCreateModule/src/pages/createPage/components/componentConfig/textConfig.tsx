
import React, { useCallback, useState } from "react"
import { ITextField } from "../../../../store/reducers/moduleReducer"

interface Props {
	item: ITextField
    update: (data:ITextField)=>void
}

export const TextConfig:React.FC<Props> = ({item, update}) => {

    const [value, setValue] = useState<string>(item.value)

    const changeLabel = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        update({...item, value: event.target.value})
    },[item])

    return(
        <div>
            <div className="input-data">
				<input className="color-normal-v2" required type="text" name="name_module" onChange={changeLabel} value={value}/>
				<label>Label</label>
			</div>
        </div>
    )
}