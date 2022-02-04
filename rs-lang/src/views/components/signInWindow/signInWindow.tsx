import React from 'react';
import './signInWindow.scss';
import { PopUp } from './../../elements/popUp/popUp';
//import { render } from '@testing-library/react';

class SignInWindow extends React.Component {
  render() {
    return (
      <PopUp>
        <h3 className='pop-up__body__sign-in-title'>Войти</h3>
      </PopUp>
    );
  }
}

export { SignInWindow };