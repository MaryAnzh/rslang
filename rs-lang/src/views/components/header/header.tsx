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
import { Burger } from '../Burger/Burger';
import { connect } from 'react-redux';
import { updateAction } from '../../../store/actionCreators/actionCreators';


type HeaderState = {
  alertStyle: { display: string },
  statisticsLinkClass: string,
  signIconClass: string,
  signBlockClass: { display: string },
  outStyle: { display: string },
  burger: { display: string },
  alertGreating: string,
}

type HeaderProps = {
  updateAction: Function,
}

class Header extends React.Component<HeaderProps> {
  state: HeaderState;

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      alertStyle: { display: 'none' },
      statisticsLinkClass: 'header__nav__link blocked',
      signIconClass: 'header__sign-icon blocked',
      signBlockClass: { display: 'block' },
      outStyle: { display: 'none' },
      burger: { display: 'none' },
      alertGreating: '',
    }
    this.authorizationUpDate = this.authorizationUpDate.bind(this);
    this.alertHiddenWrap = this.alertHiddenWrap.bind(this);
    this.burgerUp = this.burgerUp.bind(this);
  }

  render() {
    return (
      <header className="header">
        <Logo />
        <div className='header__burger'>
          <Burger burgerUp={this.burgerUp} />
        </div>

        <div
          className='header__hidden-burger-menu'
          style={this.state.burger}
        >
          <li className="header__nav__link"></li>
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
        </div>

        <Alert alertTwxt={this.state.alertGreating} alertStyle={this.state.alertStyle} />
        <div id='headerForm' className='header__form'>
          <PopUp>
            <Cross />
            <ErrorText />
            <div id='register-form' className='register-wrap'>
              <RegisterForm
                upDateHeader={this.authorizationUpDate}
                alertHidden={this.alertHiddenWrap}
              />
            </div>
            <div id='sign-in-form' className='sign-in-wrap'>
              <SignInForm
                upDateHeader={this.authorizationUpDate}
                alertHidden={this.alertHiddenWrap}
              />
            </div>
          </PopUp>
        </div>
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
          <li
            style={this.state.outStyle}
            onClick={(e) => { this.authorizationOut(e) }}
          >Выйти</li>
          <li className={this.state.signIconClass}>

            <img
              src="https://raw.githubusercontent.com/MaryAnzh/rslang-assets/4e8ba3073aa691a28f7c0a0619cc32b350c31bf4/assets/svg/sign.svg"
              alt='Sign In'></img>
            <p
            style={ this.state.outStyle }
            > {applicationModel.currentUserName} </p>
          </li>
        </ul>
      </header>
    );
  }

  upDateUserState(a: string, b: string, c: string, alertGreating: string) {
    this.props.updateAction(applicationModel.isAuthorization); // Emit dispatch for card list update
    
    this.setState(this.state.alertStyle = { display: a });
    this.setState({ correct: this.state.alertGreating = alertGreating })
    this.setState(this.state.signBlockClass = { display: b });
    this.setState({ correct: this.state.signIconClass = 'header__sign-icon ' + c });
    this.setState({ correct: this.state.statisticsLinkClass = 'header__nav__lin ' + c });
    this.setState(this.state.outStyle = { display: a });
  }
  
  alertHidden() {
    this.setState(this.state.alertStyle = { display: 'none' });
  }
  
  async authorizationUpDate(alertGreating: string) {
    this.upDateUserState('flex', 'none', 'visible', alertGreating);
  }

  async alertHiddenWrap() {
    this.alertHidden();
  }

  authorizationOut(e: React.MouseEvent<HTMLLIElement>) {
    applicationModel.isAuthorization = false;
    this.upDateUserState('none', 'block', 'blocked', '');
  }

  async burgerUp(value: string) {
    this.setState(this.state.burger = { display: value });
  }

}

const mapDispatchToProps = {
  updateAction,
};

export default connect(null, mapDispatchToProps)(Header);