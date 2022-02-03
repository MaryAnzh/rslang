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
          <li>Статистика</li>
        </ul>
        <ul className="header__sign">
          <li>Вход</li>
          <li className="header__sign-icon"><img src="https://raw.githubusercontent.com/MaryAnzh/rslang-assets/32072b0672f4d7289dc4b4af3117022d1cfe5ce7/assets/svg/sign-in.svg"></img></li>
        </ul>
      </header>
    );
  }
}
//экспорт для функции
//export default Header
//экспорт для класса
export { Header };
