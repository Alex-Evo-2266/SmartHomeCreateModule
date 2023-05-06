const { contextBridge, ipcRenderer } = require( "electron" );

// contextBridge.exposeInMainWorld('electronAPI', {
// 	setTitle: (title) => ipcRenderer.send('set-title', title)
// })

// ipcMain.on( "setMyGlobalVariable", ( event, myGlobalVariableValue ) => {
// 	global.myGlobalVariable = myGlobalVariableValue;
// } );

contextBridge.exposeInMainWorld('electronAPI', {
    closeApp: () => {
		ipcRenderer.send('app-close')
	},
	saveModule: (data) => {
		ipcRenderer.send('save-module', data)
	}
})

// ipcMain.handle('some-name', async (event, someArgument) => {
// 	const result = await doSomeWork(someArgument)
// 	return result
// })