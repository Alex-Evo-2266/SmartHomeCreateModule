const fs = require('fs')
const JSZip = require("jszip");
const path = require('path');

const { TEMPLATES_PATH } = require('../settings');
const { generateRouters } = require('./generateAPI');
const { generateSchemes } = require('./generateScheme');
const { generateModuleFile } = require('./generateModulFile');
const appRoot = path.resolve(__dirname);


const BASE_PATH = `${appRoot}/test`
const { dialog } = require('electron')

module.exports = (data) => {
	try {
		const routerFile = generateRouters(data)
		const schemes = generateSchemes(data.api)
		const init = generateModuleFile(data)

		console.log(routerFile)
		for(let item of schemes){
			console.log(item)
		}

		
		var zip = new JSZip();
		let baseFolder = zip.folder(`${data.name}_module`)
		let schemesFolder = baseFolder.folder(`schemes`)
		for(let item of schemes){
			schemesFolder.file(`${item[1]}.py`, item[0])
		}
		let routersFolder = baseFolder.folder(`routers`)
		routersFolder.file(`${routerFile[1]}.py`, routerFile[0])
		baseFolder.file("__init__.py", init)
		let pageFolder = baseFolder.folder(`page`)
		for(let item of data.pages){
			pageFolder.file(`${item.name}.json`, JSON.stringify(item))
		}

		dialog.showSaveDialog({
			title: "Select the File Path to save",
			buttonLabel: 'Save',
			filters: [
            {
                name: 'ZIP',
                extensions: ['zip'],
            }, ],
			properties: []
		}).then(file=>{
			console.log(file.canceled);
        	if (file.canceled)
            	return
			var promise = null;
			console.log();
			if (JSZip.support.uint8array) {
				promise = zip.generateAsync({type : "uint8array"});
			} else {
				promise = zip.generateAsync({type : "string"});
			}
			promise.then(function (blob) {
				fs.writeFileSync(`${file.filePath.toString()}.zip`, blob)
			}).catch((err)=>console.error(err))
		}).catch((err)=>console.error(err))
	} catch (err) {
		console.error(err)
	}
	
}


