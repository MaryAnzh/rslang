import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './css/index.css';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './views/components/AppRouter/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>, 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();