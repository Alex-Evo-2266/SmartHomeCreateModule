import './FunctionPage.scss'
import { Card, GridLayout, GridLayoutItem } from 'alex-evo-sh-ui-kit'
import { useCallback } from 'react'
import { useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { getFunction } from '@renderer/entites/module/lib/helpers/getFunction'
import { Navigation } from '@renderer/widgets/Navigation'

export const FunctionPage = () => {

    const {pages} = useAppSelector(state=>state.module)

    const getFunctionbyPages = useCallback(() => {
        return pages.map(page=>getFunction(page.page)).flat()
    },[pages])

    return(
        <>
            <Navigation/>
            <div className='page-container'>
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
        </>
    )
}