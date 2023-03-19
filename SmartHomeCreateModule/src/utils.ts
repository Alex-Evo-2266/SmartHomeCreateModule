
const SUCCESS_SIMBOL = "1234567890qwertyuiopasdfghjklzxcvbnm/_:"
const BASE_URL = "api/modules/"

export function validURL(url: string): boolean{
    if (url === "")
        return false
    for (const simbol of url) {
        if (SUCCESS_SIMBOL.indexOf(simbol) === -1)
            return false
    }
    return true
}

export function getFullURL(url: string): string{
    return BASE_URL + url
}