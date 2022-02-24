import React, { useState, useEffect, useRef } from 'react';
import './registerForm.scss';
import { startPageModel } from '../../../model/StartPageModel';
import { FormErrors } from '../../elements/FormErrors/FormErrors';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';
import { applicationModel } from '../../../model/ApplicationModel';
import { AppProperties } from '../../../interfaces/appProperties';

//const emailField = useRef(null);

type FormState = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  formErrors: { email: string, password: string },
  errorText: string;
}

type RegisterFormProps = {
  upDateHeader: Function;
  alertHidden: Function;
}

class RegisterForm extends React.Component<RegisterFormProps> {
  state: FormState;
  
  //emailField = useRef(null);

  constructor(props: RegisterFormProps) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      formErrors: { email: '', password: '' },
      errorText: '',
    }
  }

  render() {
    return (

      <div className="register-form-wrap">
        <h2>Регистрация:</h2>
        <p className='form-error-on-click'>{this.state.errorText}</p>
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
          {/* <label>*Повторите пароль:</label>
          <FormErrors password={this.state.password} passwordRepeat={this.state.passwordRepeat} name="passwordRepeat" />
          <input
            type="password"
            id="password2"
            name="password2"
            autoComplete=''
          /> */}
          <button type="button" onClick={(e) => { this.getUserDataOnClick(e) }}
          // disabled={!this.state.formValid}
          >Регистрация</button>
          <p>Уже зарегистрированы? <span className='register-link' onClick={(e) => this.navTosignInOnClick(e)}>Войти</span></p>
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

  removeInputValue() {
    this.setState({ correct: this.state.name = '' });
    this.setState({ correct: this.state.email = '' });
    this.setState({ correct: this.state.password = '' });
  }

  test() {
    this.props.alertHidden();
  }

  async getUserDataOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (this.state.name == '' || this.state.email === '' || this.state.password === '') {
      this.state.errorText = 'Заполните все поля';
      this.setState({ correct: (this.state.errorText) });

    } else if (!authorizationAppModel.isMailValid || !authorizationAppModel.isPasswordValid) {
      this.state.errorText = 'Одно из полей заполнено неверно';
      this.setState({ correct: (this.state.errorText) });

    } else {
      applicationModel.currentMail = this.state.email;
      applicationModel.currentPassword = this.state.password;
      applicationModel.currentUserName = this.state.name;
      let registerUser = await applicationModel.registerUser();
      if (registerUser) {
        const signIn = await applicationModel.signInUser();
        if (signIn) {
          authorizationAppModel.closeForm();
          const greating = 'Регистрация прошла успешно. Добро пожаловать на сайт, ' + applicationModel.currentUserName;
          this.props.upDateHeader(greating);
          setTimeout(() => {
            this.test();
          }, 3000);
          this.removeInputValue();
        }
      }
    }
  }

  navTosignInOnClick(e: React.MouseEvent<HTMLElement>) {
    authorizationAppModel.signInOnClick(e);
    this.removeInputValue();
  }
}

export { RegisterForm };