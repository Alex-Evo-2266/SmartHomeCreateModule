import { dialog } from "electron"
import { readFile } from "fs/promises"

export const loadModule = () => {
    return dialog.showOpenDialog({
        title: 'open config module',
        buttonLabel: 'open',
        filters: [
            {
                name: 'Json',
                extensions: ['json'],
            }, 
        ],
    })
    .then(res=>{
        if(res.canceled || res.filePaths.length <= 0)
            return;
        const file = res.filePaths[0]
        return readFile(file, 'utf8')
    })
    .then(fileData=>{
        if(!fileData)
            return
        return JSON.parse(fileData)
    })
}