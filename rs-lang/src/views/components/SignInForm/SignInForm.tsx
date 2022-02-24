import React from 'react';
import '../RegisterForm/registerForm.scss';
import './SignInForm.scss';
import { applicationModel } from '../../../model/ApplicationModel';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';
import { FormErrors } from '../../elements/FormErrors/FormErrors';
import { JsxFlags } from 'typescript';

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
    this.setState({
      email: '',
      password: '',
    })
  }

  upDateValue() {
    const mail = document.getElementById('sugn-in-email') as HTMLInputElement;
    const password = document.getElementById('sign-in password') as HTMLInputElement;
    const mailValue = mail.value;
    const passwordValue = password.value;
    this.setState({
      email: mailValue,
      password: passwordValue,
    });
  }

  async getUserDataOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.upDateValue();

    if (this.state.email === '' || this.state.password === '') {
      if (applicationModel.secondClickSingInForm) {
        this.setState({
          classError: 'form-error-on-click',
          errorText: 'Если у вас включено автозаполнение полей Хром, то нажмите Войти еще раз',
        });
        setTimeout(() => this.setState({
          classError: 'form-error-on-click',
          errorText: '',
        }), 3000);
        applicationModel.secondClickSingInForm = false;
      } else {
        this.setState({
          classError: 'form-error-on-click',
          errorText: 'Заполните все поля',
        });
      }

    } else if (!authorizationAppModel.isMailValid || !authorizationAppModel.isPasswordValid) {
      this.setState({
        errorText: 'Одно из полей заполнено неверно',
      });
    } else {
      applicationModel.currentMail = this.state.email;
      applicationModel.currentPassword = this.state.password;
      let signInUser = await applicationModel.signInUser();
      applicationModel.secondClickSingInForm = true;
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
    applicationModel.secondClickSingInForm = false;
    authorizationAppModel.registerOnClick(e);
    this.removeInputValue();
  }
}

export { SignInForm };