import React from 'react';
import './header.scss';
import { Logo } from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { Cross } from '../../elements/cross/cross';
import { PopUp } from '../../elements/popUp/popUp';
import { RegisterForm } from '../RegisterForm/registerForm';
import { throws } from 'assert';
import { disconnect } from 'process';

// type HeaderProperties = {
//   foo: string;
//   bar: Number;
//   fooBar: boolean;
// }

class Header extends React.Component {
  // isRegicter: boolean;

  // isSignIn: boolean;
  
  // constructor(props: HeaderProperties, isRegicter: boolean, isSignIn: boolean) {
  //   super(props);

  //   this.props.bar;
  //   this.props.foo;
  //   this.props.fooBar;
  // }

  render() {
    return (
      <header className="header">
        <div id='headerForm' className='header__form'>
          <PopUp>
            <Cross />
            <div id='register-form' className='register-wrap'>
              <RegisterForm />
            </div>
            <div id='sign-in-form' className='sign-in-wrap'>
              <p>Войти</p>
            </div>
          </PopUp>
        </div>
        
        <Logo />
        <ul className="header__nav nav">
          <li>
            <Link to="/" className="nav__link link">Главная</Link>
          </li>
          <li>
            <Link to="/textbook" className="nav__link link">Учебник</Link>
          </li>
          <li>
            <Link to="/games" className="nav__link link">Игры</Link>
          </li>
          <li>
            <Link to="/statistics" className="nav__link link">Статистика</Link>
          </li>
        </ul>
        <ul className="header__sign">
          <li onClick={(e) => this.signInOnClick(e)}>Вход</li>
          <li onClick={(e) => this.registerOnClick(e)} >Регистрация</li>
          <li className="header__sign-icon"><img src="https://raw.githubusercontent.com/MaryAnzh/rslang-assets/32072b0672f4d7289dc4b4af3117022d1cfe5ce7/assets/svg/sign-in.svg"></img></li>
        </ul>
      </header>
    );
  }

  hiddenELem(isWrapHudden: boolean, isRegisterHidden: boolean, isSignInHidden: boolean) {
    const formWrap = document.getElementById('headerForm');
    const registerForm = document.getElementById('register-form');
    const signInForm = document.getElementById('sign-in-form');
    if (isWrapHudden === false) {
      if (formWrap !== null) {
        formWrap.style.display = 'flex';
      }
    } else {
      if (formWrap !== null) {
        formWrap.style.display = 'none';
      }
    }

    if (isRegisterHidden && !isSignInHidden) {
      if (registerForm !== null) {
        registerForm.style.display = 'flex';
      }
      if (signInForm !== null) {
        signInForm.style.display = 'none';
      }
    } else {
      if (registerForm !== null) {
        registerForm.style.display = 'none';
      }
      if (signInForm !== null) {
        signInForm.style.display = 'flex';
      }
    }
  }

  registerOnClick(e: React.MouseEvent<HTMLLIElement>) {
    const isWrapHudden = false;
    const registerForm = true;
    const signInForm = false;
    this.hiddenELem(isWrapHudden, registerForm, signInForm);
  }

  signInOnClick(e: React.MouseEvent<HTMLLIElement>) {
    const isWrapHudden = false;
    const registerForm = false;
    const signInForm = true;
    this.hiddenELem(isWrapHudden, registerForm, signInForm);
  }
}

export { Header };