import React from 'react';
import './signInWindow.scss';
import { PopUp } from './../../elements/popUp/popUp';
import { RegisterForm } from '../RegisterForm/registerForm';

class SignInWindow extends React.Component {
  render() {
    return (
      <div id='register'>
      <PopUp>
        <RegisterForm />
        </PopUp>
      </div>
    );
  }
}

export { SignInWindow };