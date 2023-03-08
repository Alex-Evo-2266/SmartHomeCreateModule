import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {  } from 'react-router-dom'
import { useTypeSelector } from './hooks/useTypeSelector';
import "./style/index.scss"
import './icon/css/all.css'
import { DialogMessage } from './components/dialog/dialog';
import { Card } from './components/card/card';
import { useRoutes } from './routs';
import { Alert } from './components/alert';


const App:React.FC = ()=>{

  const router = useRoutes()

  return (
    <>
      <Alert/>
			<DialogMessage/>
			<Card/>
      <BrowserRouter>
        {router}
      </BrowserRouter>
    </>
  )
}

export default App;
