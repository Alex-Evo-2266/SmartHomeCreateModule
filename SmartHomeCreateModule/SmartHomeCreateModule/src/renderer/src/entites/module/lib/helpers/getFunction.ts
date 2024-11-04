import { IFunction } from "../../models/pageModel"
import { IComponents, TypeSrc } from '@renderer/entites/module/models/components'
import { isContainerColumn, isContainerMoreComponents, isContainerOneComponents, isGenerateContent } from '@renderer/entites/module/lib/helpers/utils'

export const getFunction = (component?: IComponents):IFunction[] => {
    if(!component) return []
    if(isGenerateContent(component) && component.src === TypeSrc.SERVER_GENERATE && component.src_key)
        return [{
            key: component.src_key,
            type: component.type,
            name: component.name
        }] as IFunction[]
    if(isContainerOneComponents(component) && component.value)
        return getFunction(component.value)
    if(isContainerMoreComponents(component))
        return component.value.map(component => getFunction(component)).flat()
    if(isContainerColumn(component))
        return component.value.map(component => getFunction(component.value)).flat()
    return []
}