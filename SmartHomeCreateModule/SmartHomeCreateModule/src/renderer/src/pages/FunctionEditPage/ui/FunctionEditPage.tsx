import { useCallback, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { Navigation } from '@renderer/widgets/Navigation'
import { useParams } from 'react-router-dom'
import MonacoEditor from 'react-monaco-editor'
import './FunctionEditPage.scss'
import { editor } from 'monaco-editor'
import { BaseActionCard, Button, Panel } from 'alex-evo-sh-ui-kit'
import { setFunctionModule } from '@renderer/entites/module/lib/reducers/moduleReducer'

export const FunctionEditPage = () => {

    const {key} = useParams()
    const {functions} = useAppSelector(state=>state.module)
    const curFunction = useMemo(()=>functions.find(item=>item.key === key), [key, functions])
    const dispatch = useAppDispatch()

    if(!curFunction)
        throw new Error("invalid function key")

    const [code, setCode] = useState(curFunction?.code);

    const options: editor.IStandaloneEditorConstructionOptions = {
        selectOnLineNumbers: true, // Включает выделение номеров строк
        automaticLayout: true, // Автоматическое изменение размера редактора
        theme: 'vs-light', // Тема редактора
        minimap: {
          enabled: false, // Отключаем мини-карту
        },
        occurrencesHighlight: "singleFile",
        renderLineHighlight: 'all',
        matchBrackets: "always"
      };

    const save = useCallback(()=>{
        dispatch(setFunctionModule(functions.map(item=>{
            if(item.key === key)
                return {...item, code}
            return item
        })))
    },[functions, key, code])

    return(
        <>
            <Navigation/>
                <Panel className='function-container'>
                    <BaseActionCard><Button onClick={save}>save</Button></BaseActionCard>
                    <MonacoEditor 
                        height="80%"
                        language="python"
                        value={code}
                        options={options}
                        onChange={(newValue) => setCode(newValue)}
                    />
                </Panel>
        </>
    )
}