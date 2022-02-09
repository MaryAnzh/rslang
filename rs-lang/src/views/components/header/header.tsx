import React from 'react';
import './header.scss';
import { Logo } from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { Cross } from '../../elements/cross/cross';
import { PopUp } from '../../elements/popUp/popUp';
import { RegisterForm } from '../RegisterForm/registerForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';
import { applicationModel } from '../../../model/ApplicationModel';

class Header extends React.Component {

  render() {
    let authorizationClass = (applicationModel.isAuthorization ? 'visible' : 'blocked');
    let iconClass = 'header__sign-icon ' + authorizationClass;
    return (
      <header className="header">
        <div id='headerForm' className='header__form'>
          <PopUp>
            <Cross />
            <div id='register-form' className='register-wrap'>
              <RegisterForm />
            </div>
            <div id='sign-in-form' className='sign-in-wrap'>
              <SignInForm />
            </div>
          </PopUp>
        </div>
        
        <Logo />
        <ul className="header__nav">
          <li>
            <Link to="/" className="header__nav__link">Главная</Link>
          </li>
          <li>
            <Link to="/textbook" className="header__nav__link">Учебник</Link>
          </li>
          <li>
            <Link to="/games" className="header__nav__link">Игры</Link>
          </li>
          <li className={authorizationClass }>
            <Link to="/statistics" className="header__nav__link" >Статистика</Link>
          </li>
        </ul>
        <ul className="header__sign">
          <li onClick={(e) => authorizationAppModel.signInOnClick(e)}>Вход</li>
          <li onClick={(e) => authorizationAppModel.registerOnClick(e)} >Регистрация</li>
          <li className= { iconClass } ><img
            src="https://raw.githubusercontent.com/MaryAnzh/rslang-assets/4e8ba3073aa691a28f7c0a0619cc32b350c31bf4/assets/svg/sign.svg"
            alt='Sign In'></img>
          </li>
        </ul>
      </header>
    );
  }
}

export { Header };