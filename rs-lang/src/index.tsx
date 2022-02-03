import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'typeface-roboto';
import { Header } from './views/components/header/header';
import { StartPage } from './views/pages/startPage/StartPage';
import reportWebVitals from './reportWebVitals';
import { Footer } from './views/components/Footer/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <StartPage />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
