import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import userStore from './userData.js';

ReactDOM.render(
  <React.StrictMode>  
    <App userStore = {userStore}/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
