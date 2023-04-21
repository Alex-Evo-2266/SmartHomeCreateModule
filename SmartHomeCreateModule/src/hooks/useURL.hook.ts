import { useTypeSelector } from "./useTypeSelector";


export const useURL = () => {

    const module = useTypeSelector(state=>state.module)
   
    const SUCCESS_SIMBOL = "1234567890qwertyuiopasdfghjklzxcvbnm/_:"
    const BASE_API_URL = `api/modules/${module.name}/`
    const BASE_PAGE_URL = `modules/${module.name}/`

    function validURL(url: string): boolean{
        if (url === "")
            return false
        for (const simbol of url) {
           if (SUCCESS_SIMBOL.indexOf(simbol) === -1)
                return false
        }
     return true
    }

    function getFullURL(url: string): string{
        if(url === '')
            return ''
        return BASE_API_URL + url
    }

    function getFullPageURL(url: string): string{
        if(url === '')
            return ''
        return BASE_PAGE_URL + url
    }

    return {
        getFullURL,
        getFullPageURL,
        validURL
    }
}