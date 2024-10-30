
import path from 'path'
import fs from 'fs'
import JSZip from 'jszip'

import {IModuleState} from '../schemas/models/module'
import { dialog } from 'electron';


export function generateModule(data: IModuleState)
{
    const zip = new JSZip();
	const baseFolder = zip.folder(`${data.name}_module`)
    if(!baseFolder) return;
	const schemesFolder = baseFolder.folder(`schemes`)
	const pagesFolder = baseFolder.folder(`pages`)
	const dialogsFolder = baseFolder.folder(`dialogs`)
	const menuFolder = baseFolder.folder(`menu`)
    if(!schemesFolder || !pagesFolder || !dialogsFolder || !menuFolder) return;




    for(let item of data.pages){
        pagesFolder.file(`${item.name}.json`, JSON.stringify(item))
    }

    for(let item of data.dialog){
        dialogsFolder.file(`${item.name}.json`, JSON.stringify(item))
    }

    for(let item of data.menu){
        menuFolder.file(`${item.name}.json`, JSON.stringify(item))
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