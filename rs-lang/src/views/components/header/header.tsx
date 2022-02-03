import React from 'react';
import './header.scss';
import { Logo } from '../Logo/Logo';
import { Link } from 'react-router-dom';
//import { render } from '@testing-library/react';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Logo />
        <ul className="header__nav nav">
          <li>
            <Link to="/" className="nav__link link">Главная</Link>
          </li>
          <li>Учебник</li>
          <li>Игры</li>
          <li>
            <Link to="/statistics" className="nav__link link">Статистика</Link>
          </li>
        </ul>
        <ul className="header__sign">
          <li>Вход</li>
          <li className="header__sign-icon">
            <img src="https://raw.githubusercontent.com/MaryAnzh/rslang-assets/32072b0672f4d7289dc4b4af3117022d1cfe5ce7/assets/svg/sign-in.svg"></img>
          </li>
        </ul>
      </header>
    );
  }
}
//экспорт для функции
//export default Header
//экспорт для класса
export { Header };
