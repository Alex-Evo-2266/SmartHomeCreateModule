
import fs from 'fs'
import JSZip from 'jszip'

import {IModuleState} from '../schemas/models/module'
import {generateModuleFile} from './generateModuleFile'
import { mainFormater} from './generateFormat'
import { dialog } from 'electron';
import { generateDeviceClass, generateDeviceModule } from './generateDeviceClass'

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

function deletetire (str:string){
    return str.replace(new RegExp(escapeRegExp('-'), 'g'), '')
}

export function generateModule(data: IModuleState)
{
    const zip = new JSZip();
	const pageModulFolder = zip.folder(`${data.name}_module`)
	const deviceModulFolder = zip.folder(`${data.name}_device_module`)
    if(!pageModulFolder || !deviceModulFolder) return;
	const schemesFolder = pageModulFolder.folder(`schemes`)
	const pagesFolder = pageModulFolder.folder(`pages`)
	const dialogsFolder = pageModulFolder.folder(`dialogs`)
	const menuFolder = pageModulFolder.folder(`menu`)
	const apiFolder = pageModulFolder.folder(`api`)
	const apiFormaters = pageModulFolder.folder(`formaters`)
	const moduleData = pageModulFolder.folder(`createModuleData`)

	const devicesFormaters = deviceModulFolder.folder(`devices`)
    if(!schemesFolder || !pagesFolder || !dialogsFolder || !menuFolder || !apiFolder || !apiFormaters || !devicesFormaters || !moduleData) return;

    moduleData.file('data.json', JSON.stringify(data))

    for(let item of data.pages){
        pagesFolder.file(`${item.name}.json`, JSON.stringify(item))
    }

    for(let item of data.dialog){
        dialogsFolder.file(`${item.name}.json`, JSON.stringify(item))
    }

    for(let item of data.menu){
        menuFolder.file(`${item.name}.json`, JSON.stringify(item))
    }

    for(let item of data.api){
        apiFolder.file(`f${item.name}.py`, item.code)
    }

    for(let item of data.devices){
        devicesFormaters.file(`${item.name}.py`, generateDeviceClass(item))
    }
    deviceModulFolder.file('__init__.py', generateDeviceModule())

    let formaters = {}
    for(let item of data.functions){
        apiFormaters.file(`f${deletetire(item.key)}.py`, item.code)
        formaters[item.key] = `${deletetire(item.key)}`
    }
    apiFormaters.file('__init__.py', mainFormater(formaters))
    pageModulFolder.file('__init__.py', generateModuleFile())

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
        if (file.canceled || !file.filePath)
            return
        saveZip(zip, file.filePath.toString())
    }).catch((err)=>console.error(err))
}


function saveZip(zip:JSZip, path){
	let promise:Promise<string | Uint8Array>;
	if (JSZip.support.uint8array) {
		promise = zip.generateAsync({type : "uint8array"});
	} else {
		promise = zip.generateAsync({type : "string"});
	}
	promise.then(function (blob) {
		fs.writeFileSync(`${path}.zip`, blob)
	}).catch((err)=>console.error(err))
}