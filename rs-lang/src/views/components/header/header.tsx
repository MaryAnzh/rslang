import React from 'react';
import './header.scss';
import logo from '../../../img/logo.svg';
//import { render } from '@testing-library/react';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img src= {logo} className="header__logo" alt="logo" />
        <ul className="header__nav">
          <li>Главная</li>
          <li>Учебник</li>
          <li>Игры</li>
          <li>О команде</li>
        </ul>
      </header>
    );
  }
}
//экспорт для функции
//export default Header
//экспорт для класса
export { Header };
