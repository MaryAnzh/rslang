import React from 'react';
import '../RegisterForm/registerForm.scss';
import './SignInForm.scss';
import { startPageModel } from '../../../model/StartPageModel';
import { applicationModel } from '../../../model/ApplicationModel';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';
import { AppProperties } from '../../../interfaces/appProperties';
import { FormErrors } from '../../elements/FormErrors/FormErrors';


type SignInFormState = {
  email: string;
  password: string;
  classError: string;
  errorText: string;
}

class SignInForm extends React.Component {
  state: SignInFormState;

  constructor(props: AppProperties) {
    super(props);
    this.state = {
      email: '',
      password: '',
      classError: 'hidden',
      errorText: '',
    }
  }

  render() {
    return (
      <div className="register-form-wrap">
        <h2>Вход:</h2>
        <p className='form-error-on-click'>{ this.state.errorText }</p>
        <form>
          <label form='username'>Имя:</label>
          <FormErrors email={this.state.email} name="email" />
          <input
            type="email"
            id="sugn-in-email"
            name="email"
            value={this.state.email}
            aria-placeholder="*Email"
            onChange={(e) => { this.handleUserInput(e) }}
          />
          <label>*Пароль:</label>
          <FormErrors password={this.state.password} name="password" />
          <input
            type="password"
            id="sign-in password"
            name="password"
            value={this.state.password}
            onChange={(e) => { this.handleUserInput(e) }}
          />
          <button type="button" onClick={(e) => { this.getUserDataOnClick(e) }}
          >Войти</button>
          <p>Нет акаунта? <span onClick={(e) => authorizationAppModel.registerOnClick(e)}>
            Зарегистрироваться</span></p>
        </form>
      </div>
    );
  }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = authorizationAppModel.handleUserInput(e);
    this.state.errorText = '';
    this.setState(inputValue);
    this.setState({ correct: (this.state.errorText) });
  }

  getUserDataOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    
    if (this.state.email === '' || this.state.password === '') {
      this.state.classError = 'form-error-on-click';
      this.state.errorText = 'Заполните все поля';
      this.setState({ correct: (this.state.errorText) });

    } else if (!authorizationAppModel.isMailValid || !authorizationAppModel.isPasswordValid) {
      this.state.errorText = 'Одно из полей заполнено неверно';
      this.setState({ correct: (this.state.errorText) });
    }  else {
      applicationModel.currentMail = this.state.email;
      applicationModel.currentPassword = this.state.password;
      applicationModel.signInUser();
    }

  }
}

export { SignInForm };