import { useCallback } from "react"
import { useAppDispatch } from "../../../../shared/lib/hooks/redux"
import { setNavigation } from "../reducers/NavigationReducer"

export const NavigationInit = () => {

    const dispatch = useAppDispatch()

    const init = useCallback(async() => {
        const allItems = []
        const items = []
        dispatch(setNavigation({
            items: allItems ?? [],
            favouritesItems: items ?? []
        }))
    },[])

    return { init }
}