import './FunctionPage.scss'
import { GridLayout, GridLayoutItem } from 'alex-evo-sh-ui-kit'
import { useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { Navigation } from '@renderer/widgets/Navigation'
import { FunctionCard } from '@renderer/widgets/FunctionCard'

export const FunctionPage = () => {

    const {functions} = useAppSelector(state=>state.module)
    
    return(
        <>
            <Navigation/>
            <div className='page-container'>
                <GridLayout>
                {
                    functions.map((item, index)=>(
                        <GridLayoutItem>
                            <FunctionCard key={index} keyFunction={item.key} name={item.name ?? ""} type={item.type} />
                        </GridLayoutItem>
                    ))
                }
                </GridLayout>
            </div>
        </>
    )
}