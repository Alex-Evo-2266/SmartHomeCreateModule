import { ElectronAPI } from '@electron-toolkit/preload'
import {IModuleState} from '../main/schemas/models/module'

interface API {
  saveModule: (data:IModuleState)=>void
  loadModule: ()=>Promise<IModuleState>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
  declare type RootState = import('../renderer/src/app/store/appStore').RootState
  declare type AppDispatch = import('../renderer/src/app/store/appStore').AppDispatch

  interface IDict<T>{
    [key:string]: T
  }

  declare type Dict<T> = IDict<T>
}
