import { useCallback, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@renderer/shared/lib/hooks/redux'
import { Navigation } from '@renderer/widgets/Navigation'
import { useParams } from 'react-router-dom'
import MonacoEditor from 'react-monaco-editor'
import { editor } from 'monaco-editor'
import { Button, IconButton, Panel } from 'alex-evo-sh-ui-kit'
import { setAPIModule } from '@renderer/entites/module/lib/reducers/moduleReducer'
import { DialogPortal } from '@renderer/shared/ui'
import { FormaterComponents } from '@renderer/widgets/FormatersComponents'

import './RouterEditPage.scss'

export const APIEditPage = () => {

    const {key} = useParams()
    const {api} = useAppSelector(state=>state.module)
    const [infoVisible, setInfoVisible] = useState(false)
    const curAPI = useMemo(()=>api.find(item=>item.url === key), [key, api])
    const dispatch = useAppDispatch()

    if(!curAPI)
        throw new Error("invalid function key")

    const [code, setCode] = useState(curAPI?.code);

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
        dispatch(setAPIModule(api.map(item=>{
            if(item.url === key)
                return {...item, code}
            return item
        })))
    },[api, key, code])

    return(
        <>
            <Navigation/>
                <Panel className='function-container'>
                    <div className='function-edit-buttons-container'>
                        <IconButton icon={"!"} onClick={()=>setInfoVisible(true)}/>
                        <Button onClick={save}>save</Button>
                    </div>
                    <MonacoEditor 
                        height="80%"
                        language="python"
                        value={code}
                        options={options}
                        onChange={(newValue) => setCode(newValue)}
                    />
                </Panel>
                {
                    infoVisible &&
                    <DialogPortal>
                        <FormaterComponents onHide={()=>setInfoVisible(false)}/>
                    </DialogPortal>
                }
        </>
    )
}