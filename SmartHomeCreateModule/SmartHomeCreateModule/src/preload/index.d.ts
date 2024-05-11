import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
  declare type RootState = import('../renderer/src/app/store/appStore').RootState
  declare type AppDispatch = import('../renderer/src/app/store/appStore').AppDispatch

  interface IDict<T>{
    [key:string]: T
  }

  declare type Dict<T> = IDict<T>
}
