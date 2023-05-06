const { TEMPLATES_PATH } = require("../settings")
const fs = require('fs')
const { parseReplaceableElementsModule, parseReplaceableElementsAPI, parseReplaceableElementsOptions, parseReplaceableInputData, replaceTemplates } = require("./helpers/replaceTemplates")

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
	return replaceTemplates(file_content_header, replaceTemplatesSwitch(module))
} 

function generateRouter (api, module) {
	let file_content_header = fs.readFileSync(`${TEMPLATES_PATH}/router/router_function.py`)
	file_content_header = file_content_header.toString()
	return replaceTemplates(file_content_header, replaceTemplatesSwitch(module, api))
}

function replaceTemplatesSwitch(module, api=undefined){
	return function(replaceableElements){
		let newElement = parseReplaceableElementsModule(replaceableElements, module)
		if(!newElement && api)
			newElement = parseReplaceableElementsAPI(replaceableElements, api)
		if(!newElement && api)
			newElement = parseReplaceableElementsOptions(replaceableElements, api)
		if(newElement === undefined && api)
			newElement = parseReplaceableInputData(replaceableElements, api)
		return newElement
	}
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