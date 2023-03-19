import { ITextField, IType, TypeComponent, TypeContent } from "../../store/reducers/moduleReducer";

export const getNewData = (type:TypeComponent) => {
	let res: IType = {
		type: TypeComponent.TEXT,
		type_content: TypeContent.TEXT,
		value: ""
	}
	if (type === TypeComponent.TEXT)
		res = {
			type: TypeComponent.TEXT,
			type_content: TypeContent.TEXT,
			value: ""
		}
	else if (type === TypeComponent.BUTTON)
		res = {
			type: TypeComponent.BUTTON,
			title: "",
			action_url: ""
		}
	else if (type === TypeComponent.CARD)
		res = {
			type: TypeComponent.CARD,
			src: "",
			title: "",
			text: "",
			buttons: []
		}
	else if (type === TypeComponent.DEVICE_CARD)
		res = {
			type: TypeComponent.DEVICE_CARD,
			src: "",
			title: "",
			text: "",
			buttons: []
		}
	else if (type === TypeComponent.CARDS)
		res = {
			type: TypeComponent.CARDS,
			src: "",
			title: "",
			text: "",
			buttons: []
		}
	else if (type === TypeComponent.COLUMNS)
		res = {
			type: TypeComponent.COLUMNS,
			count: 2,
			value: []
		}
	return (res)
}