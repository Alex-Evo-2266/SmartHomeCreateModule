import { useNavigate } from 'react-router-dom'
import './FunctionPage.scss'
import { Button, Card, GridLayout, GridLayoutItem } from 'alex-evo-sh-ui-kit'
import { useCallback } from 'react'
import { useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { IComponents, TypeSrc } from '@renderer/entites/module/models/components'
import { isContainerColumn, isContainerMoreComponents, isContainerOneComponents, isGenerateContent } from '@renderer/entites/module/lib/helpers/utils'
import { TypeComponent } from 'alex-evo-web-constructor'

interface Function{
    key: string
    type: TypeComponent
    name?: string
}

export const FunctionPage = () => {

    const navigate = useNavigate()
    const {pages} = useAppSelector(state=>state.module)

    const getFunction = (component?: IComponents):Function[] => {
        if(!component) return []
        if(isGenerateContent(component) && component.src === TypeSrc.SERVER_GENERATE)
            return [{
                key:component.src_key,
                type: component.type,
                name: component.name
            }] as Function[]
        if(isContainerOneComponents(component) && component.value)
            return getFunction(component.value)
        if(isContainerMoreComponents(component))
            return component.value.map(component => getFunction(component)).flat()
        if(isContainerColumn(component))
            return component.value.map(component => getFunction(component.value)).flat()
        return []
    }

    const getFunctionbyPages = useCallback(() => {
        return pages.map(page=>getFunction(page.page)).flat()
    },[pages])

    return(
        <div className='home-page'>
            <Button onClick={()=>navigate('/home')}>home</Button>
            <GridLayout>
            {
                getFunctionbyPages().map((item, index)=>(
                    <GridLayoutItem key={index}>
                        <Card header={item.type} subhead={item.key}></Card>
                    </GridLayoutItem>
                ))
            }
            </GridLayout>
        </div>
    )
}