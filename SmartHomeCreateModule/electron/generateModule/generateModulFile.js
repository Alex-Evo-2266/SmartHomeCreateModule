const fs = require('fs')
const { TEMPLATES_PATH } = require("../settings")
const { replaceTemplates, parseReplaceableElementsModule } = require("./helpers/replaceTemplates")

module.exports.generateModuleFile = (module) => {
	try{
        let content = getModuleTemplates()
        let replaceData = replaceTemplates(content, replaceTemplatesSwitch(module))
        return replaceData
	}
	catch(err){
		console.error(err)
	}	
}

function getModuleTemplates() {
	let file_content = fs.readFileSync(`${TEMPLATES_PATH}/__init__.py`)
	file_content = file_content.toString()
	return file_content
} 

function replaceTemplatesSwitch(module){
    return function(replaceableElements){
        let newElement = parseReplaceableElementsModule(replaceableElements, module)
        return newElement
    }
}