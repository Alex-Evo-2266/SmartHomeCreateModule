import { ROOT_API_URL, ROOT_PAGES_URL } from "@renderer/consts"
import { useAppSelector } from "@renderer/shared/lib/hooks/redux"



export const useURL = () => {

    const module = useAppSelector(state=>state.module)
   
    const reg = /^[1-9a-z-:]*$/
    const BASE_API_URL = `${ROOT_API_URL}/${module.name}/`
    const BASE_PAGE_URL = `${ROOT_PAGES_URL}/${module.name}/`

    function validURL(url: string): boolean{
        return reg.test(url)
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
        validURL,
        BASE_API_URL
    }
}