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
import { userStorage } from './model/UserStorage';
import { applicationModel } from './model/ApplicationModel';


async function isUser() {
  console.log(userStorage.auth);
  const a = await userStorage.auth;
  console.log(a.token);
  if (a.token !== '' && a.token !== undefined) {
    applicationModel.isAuthorization = true;
  }

  //прописываем флаги завязанные на автаризацию на саммх страницаж
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
}
isUser()
export { isUser }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();