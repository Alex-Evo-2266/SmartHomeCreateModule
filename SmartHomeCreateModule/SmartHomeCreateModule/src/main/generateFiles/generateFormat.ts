
const FORMATER_FILE_TENPLATE = `from app.internal.pages.schemas.components import ComponentType, Component

def formater()->list[Component]:
	return []
`

const MAIN_FORMATER_IMPORT = 'from . import '

export const generateformater = () => {
	return FORMATER_FILE_TENPLATE
}

export const mainFormater = (data:{[key:string]:string}) => {
	let file = ''
	let formaters = 'formaters = {\n\t'
	for(const key in data)
	{
		file = file + MAIN_FORMATER_IMPORT + key + '\n'
		formaters = formaters + key + ": " + data[key] + ',\n\t'
	}
	file = file + '\n\n' + formaters + "}"
	return file
}