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
import { ErrorText } from '../../elements/errorText/errorText';
import { Alert } from '../../elements/alert/alert';
import { AppProperties } from '../../../interfaces/appProperties';

type HeaderState = {
  alertStyle: { display: string },
  statisticsLinkClass: string,
  signIconClass: string,
  signBlockClass: { display: string },
}

class Header extends React.Component {
  state: HeaderState;

  constructor(props: {}) {
    super(props);
    this.state = {
      alertStyle: { display: 'none' },
      statisticsLinkClass: 'header__nav__link blocked',
      signIconClass: 'header__sign-icon blocked',
      signBlockClass: { display: 'block' },
    }
    this.authorizationUpDate = this.authorizationUpDate.bind(this);
    this.alertHiddenWrap = this.alertHiddenWrap.bind(this);
  }

  render() {
    return (
      <header className="header">
        <Alert alertTwxt='Добро пожаловать' alertStyle={this.state.alertStyle} />
        <div id='headerForm' className='header__form'>
          <PopUp>
            <Cross />
            <ErrorText />
            <div id='register-form' className='register-wrap'>
              <RegisterForm />
            </div>
            <div id='sign-in-form' className='sign-in-wrap'>
              <SignInForm
                upDateHeader={this.authorizationUpDate}
                alertHidden={this.alertHiddenWrap}
              />
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
          <li className={this.state.statisticsLinkClass}>
            <Link to="/statistics" className="header__nav__link" >Статистика</Link>
          </li>
        </ul>
        <ul className="header__sign">
          <li
            style={this.state.signBlockClass}
            onClick={(e) => authorizationAppModel.signInOnClick(e)}>Вход</li>
          <li
            style={this.state.signBlockClass}
            onClick={(e) => authorizationAppModel.registerOnClick(e)} >Регистрация</li>
          <li className={this.state.signIconClass}><img
            src="https://raw.githubusercontent.com/MaryAnzh/rslang-assets/4e8ba3073aa691a28f7c0a0619cc32b350c31bf4/assets/svg/sign.svg"
            alt='Sign In'></img>
          </li>
        </ul>
      </header>
    );
  }

  upDateUserState() {
    this.setState(this.state.alertStyle = { display: 'flex' });
    this.setState(this.state.signBlockClass = { display: 'none' });
    this.setState({ correct: this.state.signIconClass = 'header__sign-icon visible' });
    this.setState({ correct: this.state.statisticsLinkClass = 'header__nav__lin visible' });
  }

  alertHidden() {
    this.setState(this.state.alertStyle = { display: 'none' });
  }

  async authorizationUpDate() {
    this.upDateUserState();
  }

  async alertHiddenWrap() {
    this.alertHidden();
  }
}

export { Header };