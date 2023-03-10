
export type IElectronAPI = {
  closeApp: () => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
    type_electron: string
    set_title: string
  }
}