import { IModuleState } from "./interfaces/module"

export type IElectronAPI = {
  closeApp: () => void
  saveModule: (data:IModuleState) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
    type_electron: string
    set_title: string
  }
}