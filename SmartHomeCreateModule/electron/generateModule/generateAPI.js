const { TEMPLATES_PATH } = require("../settings")
const fs = require('fs')

const getResponseModel = (name) => `response_model=Table${name}Scheme`

const getImportTableScheme = (module_name, table_title) => `from castom_moduls.${module_name}.schemes.${table_title} import Table${table_title}Scheme\n`

module.exports.generateRouters = (module) => {
	try{
		const apis = module.api ?? []
		let file_content = getImportsScheme(module)
		file_content = file_content + generateRouterHeader(module)
		for(let api of apis)
		{
			file_content = file_content + generateRouter(api, module)
		}
		return [file_content, "base_module_router"]
	}
	catch(err){
		console.error(err)
	}	
}

function generateRouterHeader (module) {
	let file_content_header = fs.readFileSync(`${TEMPLATES_PATH}/router/router_header.py`)
	file_content_header = file_content_header.toString()
	return replaceTemplates(file_content_header, module)
} 

function generateRouter (api, module) {
	let file_content_header = fs.readFileSync(`${TEMPLATES_PATH}/router/router_function.py`)
	file_content_header = file_content_header.toString()
	return replaceTemplates(file_content_header, module, api)
} 

function replaceTemplates(content, module, api=undefined) {
	let splitContent = content.split("%{")
	console.log(splitContent)
	for(let i = 0; i < splitContent.length; i++)
	{
		if(splitContent[i].search("}%") < 0)
			continue
		const replaceableElements = splitContent[i].substring(0, splitContent[i].search("}%") + 2)
		let newElement = parseReplaceableElementsModule(replaceableElements, module)
		if(!newElement && api)
			newElement = parseReplaceableElementsAPI(replaceableElements, api)
		if(!newElement && api)
			newElement = parseReplaceableElementsOptions(replaceableElements, api)
		if(newElement === undefined && api)
			newElement = parseReplaceableInputData(replaceableElements, api)
		if(newElement === undefined)
			continue
		splitContent[i] = splitContent[i].replace(replaceableElements, newElement)
	}
	return splitContent.join("")
}

function getImportsScheme(module) {
	let importsFile = ""
	for(let api of module.api)
	{
		if(api.use === "TABLE" && api.useDitail)
			importsFile = importsFile + getImportTableScheme(module.name, api.useDitail.title ?? "noname")
	}
	return importsFile
}

function parseReplaceableElementsOptions(replaceableElements, api) {
	const replaceableElements2 = replaceableElements.slice(0, replaceableElements.length - 2)
	const splitElement = replaceableElements2.split(".")
	if(splitElement[0] === "route_option")
	{
		let options = ""
		if(api.use === "TABLE" && api.useDitail)
		{
			options = options + ", " + getResponseModel(api.useDitail.title)
		}
		return options
	}
	return undefined
}

function parseReplaceableInputData(replaceableElements, api) {
	const replaceableElements2 = replaceableElements.slice(0, replaceableElements.length - 2)
	const splitElement = replaceableElements2.split(".")
	if(splitElement[0] === "input_data")
	{
		console.log(api, "p0")
		let options = ""
		if(api.use === "TABLE_BUTTON" && api.useDitail?.value === "$index")
		{
			options = options + "index:int, "
		}
		return options
	}
	return undefined
}

function parseReplaceableElementsModule(replaceableElements, module) {
	const replaceableElements2 = replaceableElements.slice(0, replaceableElements.length - 2)
	const splitElement = replaceableElements2.split(".")
	if(splitElement[0] === "module" && splitElement[1] === "name")
		return (module.name)
	return undefined
}

function parseReplaceableElementsAPI(replaceableElements, api) {
	const replaceableElements2 = replaceableElements.slice(0, replaceableElements.length - 2)
	const splitElement = replaceableElements2.split(".")
	if(splitElement[0] === "api" && splitElement[1] === "name")
		return (api.name)
	if(splitElement[0] === "api" && splitElement[1] === "url")
		return (api.url)
	if(splitElement[0] === "api" && splitElement[1] === "type")
	{
		if (api.type === "POST")
			return "post"
		else
			return "get"
	}
	return undefined
}