import React from 'react';
import './registerForm.scss';
import { startPageModel } from '../../../model/StartPageModel';
import { FormErrors } from '../../elements/FormErrors/FormErrors';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';
import { applicationModel } from '../../../model/ApplicationModel';
import { AppProperties } from '../../../interfaces/appProperties';

type FormState = {
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
            type="email"
            id="new-user-email"
            name="email"
            value={this.state.email}
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
          <button type="button" onClick={(e) => { applicationModel.registerUser(e) }}
            disabled={!this.state.formValid}>Регистрация</button>
          <p>Уже зарегистрированы? <span className='register-link' onClick={(e) => startPageModel.signInOnClick(e)}>Войти</span></p>
        </form>
      </div>
    );
  }

  // validateForm() {
  //   this.setState({
  //     formValid: this.state.emailValid &&
  //       this.state.passwordValid,
  //   });
  // }

  // validateField(fieldName: string, value: string) {
  //   let fieldValidationErrors = this.state.formErrors;
  //   let emailValid = this.state.emailValid;
  //   let passwordValid = this.state.formValid;
  //   switch (fieldName) {
  //     case 'email':
  //       if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) == null) {
  //         fieldValidationErrors.email = 'Некорректный Email';
  //         emailValid = false;
  //       } else {
  //         fieldValidationErrors.email = '';
  //         emailValid = true;
  //       }  
  //       break;
  //     case 'password':
  //       if (value.length < 8) {
  //         fieldValidationErrors.password = 'Пароль слишком короткий';
  //         passwordValid = false;
  //       } else {
  //         fieldValidationErrors.password = '';
  //         passwordValid = true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState({
  //     formErrors: fieldValidationErrors,
  //     emailValid: emailValid,
  //     passwordValid: passwordValid,
  //   }, this.validateForm);
  // }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = authorizationAppModel.handleUserInput(e);
    this.setState( a );
    //this.validateField(name, value);
  }
}

export { RegisterForm };