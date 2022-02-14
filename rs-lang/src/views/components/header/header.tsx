import React from 'react';
import './header.scss';
import '../../../css/animation.scss';
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
import { Arrow } from '../../elements/arrow/arrow';


type HeaderState = {
  alertStyle: { display: string },
  statisticsBurgerLinkClass: string,
  statisticsNavLinkClass: string,
  signIconClass: string,
  signBlockClass: { display: string },
  outStyle: { display: string },
  burger: { display: string },
  alertGreating: string,
  bookListAnimation: { animation: string },
  gameListtAnimation: { animation: string },
  bookSection: { display: string, },
  gameSection: { display: string, },
  bookNavSection: { display: string, },
  gameNavSection: { display: string, },
}

type HeaderProps = {
  updateAction: Function,
}

class Header extends React.Component<HeaderProps> {
  state: HeaderState;

  isBooKSectionOpen = false;

  isGameSectionOpen = false;
  
  isNavBooKSectionOpen = false;

  isNavGameSectionOpen = false;


  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      alertStyle: { display: 'none' },
      statisticsBurgerLinkClass: 'header__hidden-burger-menu__list__link blocked',
      statisticsNavLinkClass: 'header__nav__li__link blocked',
      signIconClass: 'header__sign-icon blocked',
      signBlockClass: { display: 'block' },
      outStyle: { display: 'none' },
      burger: { display: 'none' },
      alertGreating: '',
      bookListAnimation: { animation: 'none' },
      gameListtAnimation: { animation: 'none' },
      bookSection: { display: 'none' },
      gameSection: { display: 'none' },
      bookNavSection: { display: 'none' },
      gameNavSection: { display: 'none' },
    }
    this.authorizationUpDate = this.authorizationUpDate.bind(this);
    this.alertHiddenWrap = this.alertHiddenWrap.bind(this);
    this.burgerUp = this.burgerUp.bind(this);
  }

  render() {
    const arrow = 'enclosed-burger__wrap__arrow left-arrow';
    const arrowNav = 'left-arrow';
    return (
      <header className="header">
        <Logo />
        <div className='header__burger'>
          <Burger burgerUp={this.burgerUp} />
        </div>
        <div
          className='header__hidden-burger-menu'
          style={this.state.burger}>
          <li className="header__hidden-burger-menu__list"></li>
          <li className='header__hidden-burger-menu__list'>
            <Link to="/" className="header__hidden-burger-menu__list__link">Главная</Link>
          </li>
          <li
            className='header__hidden-burger-menu__list enclosed-burger'
            style={this.state.bookListAnimation}>
            <div className='enclosed-burger__wrap'>
              <Link to="/textbook" className="header__hidden-burger-menu__list__link">Учебник</Link>
              <div onClick={(e) => { this.openGameSectionOnClick(e) }}>
                <Arrow arrowClass={arrow} />
              </div>
            </div>
            <div
              className='wrap-book-lists'
              style={this.state.bookSection}>

              <Link to="/textbook" className="wrap-book-lists__link">Уровень 1</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 2</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 3</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 4</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 5</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 6</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Сложные слова</Link>
            </div>
          </li>
          <li
            className='header__hidden-burger-menu__list enclosed-burger'
            style={this.state.gameListtAnimation}>
            <div className='enclosed-burger__wrap'>
              <Link to="/games" className="header__hidden-burger-menu__list__link">Игры</Link>
              <div onClick={(e) => { this.openBookSectionOnClick(e) }}>
                <Arrow arrowClass={arrow} />
              </div>
            </div>
            <div
              className='wrap-game-lists'
              style={this.state.gameSection}>
              <Link to="/games" className="wrap-game-lists__link">Аудиовызов</Link>
              <Link to="/games" className="wrap-game-lists__link">Спринт</Link>
            </div>
          </li>
          <li className='header__hidden-burger-menu__list'>
            <Link to="/statistics" className={this.state.statisticsBurgerLinkClass} >Статистика</Link>
          </li>
        </div >

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
          <li className='header__nav__li'>
            <Link to="/" className="header__nav__li__link">Главная</Link>
          </li>
          <li className='header__nav__li'>
            <div className='header__nav__li__enclosed'>
              <div className='header__nav__li__enclosed__name'>
                <Link to="/textbook">Учебник</Link>
                <div className='header__nav__li__enclosed__name__arrow'
                  onClick={(e) => { this.openNavBookSectionOnClick(e)}}>
                  <Arrow arrowClass={arrowNav} />
                </div>
              </div>
            </div>
            <div
              className='wrap-book-lists'
              style={this.state.bookNavSection}>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 1</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 2</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 3</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 4</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 5</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Уровень 6</Link>
              <Link to="/textbook" className="wrap-book-lists__link">Сложные слова</Link>
            </div>
          </li>
          <li className='header__nav__li'>
            <div className='header__nav__li__enclosed'>
              <div className='header__nav__li__enclosed__name'>
                <Link to="/games" className="header__nav__li__link">Игры</Link>
                <div
                  className='header__nav__li__enclosed__name__arrow'
                  onClick={(e) => { this.openNavGameSectionOnClick(e) }}>

                  <Arrow arrowClass={arrowNav} />
                </div>
              </div>
            </div>
            <div
              className='wrap-game-lists'
              style={this.state.gameNavSection}>
              <Link to="/games" className="wrap-game-lists__link">Аудиовызов</Link>
              <Link to="/games" className="wrap-game-lists__link">Спринт</Link>
            </div>
          </li>
          <li className='header__nav__li'>
            <Link to="/statistics" className={this.state.statisticsNavLinkClass} >Статистика</Link>
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
              style={this.state.outStyle}
            > {applicationModel.currentUserName} </p>
          </li>
        </ul>
      </header >
    );
  }

  upDateUserState(a: string, b: string, c: string, alertGreating: string) {
    this.props.updateAction(applicationModel.isAuthorization); // Emit dispatch for card list update
    
    this.setState(this.state.alertStyle = { display: a });
    this.setState({ correct: this.state.alertGreating = alertGreating })
    this.setState(this.state.signBlockClass = { display: b });
    this.setState({ correct: this.state.signIconClass = 'header__sign-icon ' + c });
    this.setState({ correct: this.state.statisticsBurgerLinkClass = 'header__nav__lin ' + c });
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
    this.setState(this.state.bookListAnimation = { animation: 'none' });
    this.setState(this.state.gameListtAnimation = { animation: 'none' });

  }

  openBookSectionOnClick(e: React.MouseEvent<HTMLElement>) {
    if (this.isGameSectionOpen) {
      this.isGameSectionOpen = false;
      this.setState(this.state.gameListtAnimation = { animation: 'close-game-list .3s' });
      this.setState(this.state.gameSection = { display: 'none' });
    } else {
      this.isGameSectionOpen = true;
      this.setState(this.state.gameListtAnimation = { animation: 'open-game-list .3s forwards' });
      this.setState(this.state.gameSection = { display: 'flex' });
    }
  }

  openGameSectionOnClick(e: React.MouseEvent<HTMLElement>) {
    if (this.isBooKSectionOpen) {
      this.isBooKSectionOpen = false;
      this.setState(this.state.bookListAnimation = { animation: 'close-book-list .3s' });
      this.setState(this.state.bookSection = { display: 'none' });
    } else {
      this.isBooKSectionOpen = true;
      this.setState(this.state.bookListAnimation = { animation: 'open-book-list .3s forwards' });
      this.setState(this.state.bookSection = { display: 'flex' });
    }
  }

  openNavBookSectionOnClick(r: React.MouseEvent<HTMLElement>) {
    if (!this.isNavBooKSectionOpen) {
      this.setState(this.state.bookNavSection = { display: 'flex' });
      this.isNavBooKSectionOpen = true;
    } else {
      this.setState(this.state.bookNavSection = { display: 'none' });
      this.isNavBooKSectionOpen = false;
    }
  }

  openNavGameSectionOnClick(r: React.MouseEvent<HTMLElement>) {
    if (!this.isNavGameSectionOpen) {
      this.setState(this.state.gameNavSection = { display: 'flex' });
      this.isNavGameSectionOpen = true;
    } else {
      this.setState(this.state.gameNavSection = { display: 'none' });
      this.isNavGameSectionOpen = false;
    }
  }
}

const mapDispatchToProps = {
  updateAction,
};

export default connect(null, mapDispatchToProps)(Header);