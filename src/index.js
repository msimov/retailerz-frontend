import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import reportWebVitals from './reportWebVitals';

import App from './containers/app.container';

import FirebaseService from './services/firebase.service';
import {FirebaseContext} from './context/firebase.context';


ReactDOM.render(
  <FirebaseContext.Provider value={new FirebaseService()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
