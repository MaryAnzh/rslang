import React from 'react';
import './startPage.scss';
import logo from '../../../img/logo.svg';
//import { render } from '@testing-library/react';

class StartPage extends React.Component {
  render() {
    return (
      <main className="start-page main">
        <img src={logo} className="start-page-logo" alt="logo" />
      </main>
    );
  }
}
//экспорт для функции
//export default Header
//экспорт для класса
export { StartPage };
