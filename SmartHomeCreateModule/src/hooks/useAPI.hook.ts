import { useDispatch } from "react-redux";
import { IAPI, set_module, TypeRequest } from "../store/reducers/moduleReducer";
import { useTypeSelector } from "./useTypeSelector";


export const useAPI = () => {

	const module = useTypeSelector(state=>state.module)
	const dispatch = useDispatch()
	
	const getAPITypeGet = (filterIgnoreURL:string | null = null) => {
		return module.api.filter(item=>(item.type === TypeRequest.GET && !item.use) || item.url === filterIgnoreURL)
	}

	class APIItem {
		id: number
		data: IAPI

		constructor(id:number, api:IAPI) {
			this.id = id
			this.data = api
		}

		save():void {
			let newAPIList = module.api
			newAPIList[this.id] = this.data
			dispatch(set_module({...module, api: newAPIList}))
		}
	}

	const getAPIbyName = (name:string | undefined | null) => {
		if (!name)
			return null
		const condidat = module.api
			.map((item, index) => new APIItem(index, item))
			.filter(item=>item.data.name === name)
		if (condidat.length <= 0)
			return null
		return condidat[0]
	}

	const getAPI = (url:string | undefined | null) => {
		if (!url)
			return null
		const condidat = module.api
			.map((item, index) => new APIItem(index, item))
			.filter(item=>item.data.url === url)
		if (condidat.length <= 0)
			return null
		return condidat[0]
	}

	return {
		getAPITypeGet,
		getAPIbyName,
		getAPI,
		APIItem
	}
}