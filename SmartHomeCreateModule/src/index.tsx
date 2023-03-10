import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './store'


const close = async ()=>{
  window.electronAPI.closeApp()
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <div id="drag-bar">
        <div className='bar-eptyblock'></div>
        <div id="drag"></div>
        <button id="close-btn" className='btn btn-square' onClick={close}>x</button>
      </div>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
