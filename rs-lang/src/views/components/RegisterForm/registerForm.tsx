import React from 'react';
import './registerForm.scss';
import { startPageModel } from '../../../model/StartPageModel';
import { FormErrors } from '../../elements/FormErrors/FormErrors';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';
import { applicationModel } from '../../../model/ApplicationModel';
import { AppProperties } from '../../../interfaces/appProperties';

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  formErrors: { email: string, password: string },
  emailValid: boolean,
  passwordValid: boolean,
  formValid: boolean
}

class RegisterForm extends React.Component {
  state: FormState;

  constructor(props: AppProperties) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
    }
  }

  render() {
    return (
      <div className="register-form-wrap">
        <h2>Регистрация:</h2>
        <form>
          <label>*Имя:</label>

          <input
            type="nnme"
            id="new-user-nnme"
            name="name"
            value={this.state.name}
            onChange={this.handleUserInput}
          />
          <label>*Email:</label>
          <FormErrors email={this.state.email} name="email" />
          <input
            type="email"
            id="new-user-email"
            name="email"
            value={this.state.email}
            onChange={this.handleUserInput}
          />
          <label>*Пароль:</label>
          <FormErrors password={this.state.password} name="password" />
          <input
            type="password"
            id="new-user-password"
            name="password"
            value={this.state.password}
            onChange={this.handleUserInput}
          />
          <label>*Повторите пароль:</label>
          <FormErrors password={this.state.password} passwordRepeat={this.state.passwordRepeat} name="passwordRepeat" />
          <input
            type="password"
            id="password2"
            name="password2"
            autoComplete=''
          />
          <button type="button" onClick={(e) => { this.getUserDataOnClick(e) }}
            // disabled={!this.state.formValid}
          >Регистрация</button>
          <p>Уже зарегистрированы? <span className='register-link' onClick={(e) => authorizationAppModel.signInOnClick(e)}>Войти</span></p>
        </form>
      </div>
    );
  }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = authorizationAppModel.handleUserInput(e);
    this.setState(inputValue);
  }

  getUserDataOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    applicationModel.currentUserName = this.state.name;
    applicationModel.currentMail = this.state.email;
    applicationModel.currentPassword = this.state.password;
    applicationModel.registerUser();
  }
}

export { RegisterForm };