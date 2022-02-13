import React from 'react';
import '../RegisterForm/registerForm.scss';
import './SignInForm.scss';
import { startPageModel } from '../../../model/StartPageModel';
import { applicationModel } from '../../../model/ApplicationModel';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';
import { FormErrors } from '../../elements/FormErrors/FormErrors';

type SignInFormState = {
  email: string;
  password: string;
  classError: string;
  errorText: string;
}

type SignInFormProps = {
  upDateHeader: Function;
  alertHidden: Function;
}

class SignInForm extends React.Component<SignInFormProps> {
  state: SignInFormState;

  constructor(props: SignInFormProps) {
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
      <div
        className="register-form-wrap">
        <h2>Вход:</h2>
        <p className='form-error-on-click'>{this.state.errorText}</p>
        <form>
          <label form='email'>*Email:</label>
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
          <p>Нет акаунта? <span onClick={(e) => this.navToRegisterFormOnClick(e)}>
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

  test() {
    this.props.alertHidden();
  }

  removeInputValue() {
    this.setState({ correct: this.state.email = '' });
    this.setState({ correct: this.state.password = '' });
  }

  upDateValue() {
    this.setState({ correct: this.state.email });
    this.setState({ correct: this.state.password });
  }

  async getUserDataOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.upDateValue();
    if (this.state.email === '' || this.state.password === '') {
      this.state.classError = 'form-error-on-click';
      this.state.errorText = 'Заполните все поля';
      this.setState({ correct: (this.state.errorText) });

    } else if (!authorizationAppModel.isMailValid || !authorizationAppModel.isPasswordValid) {
      this.state.errorText = 'Одно из полей заполнено неверно';
      this.setState({ correct: (this.state.errorText) });
    } else {
      applicationModel.currentMail = this.state.email;
      applicationModel.currentPassword = this.state.password;
      let signInUser = await applicationModel.signInUser();
      if (signInUser) {
        authorizationAppModel.closeForm();
        const greating = 'Добро пожаловать на сайт, ' + applicationModel.currentUserName;
        await this.props.upDateHeader(greating);
        setTimeout(() => {
          this.test();
        }, 3000);
        this.removeInputValue();
      }
    }
  }

  navToRegisterFormOnClick(e: React.MouseEvent<HTMLElement>) {
    authorizationAppModel.registerOnClick(e);
    this.removeInputValue();
  }
}

export { SignInForm };