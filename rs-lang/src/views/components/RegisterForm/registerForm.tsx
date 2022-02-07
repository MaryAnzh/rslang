import React from 'react';
import './registerForm.scss';
import { startPageModel } from '../../../model/StartPageModel';

type AppProperties = {
  foo: string;
  bar: Number;
  fooBar: boolean;
}

type FormState = {
  email: string;
  password: string;
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
          <label>Email:</label>
          <input
            type="email"
            id="new-user-email"
            name="email"
            value={this.state.email}
            onChange={this.handleUserInput}
          //onChange={changeInputRegister}
          //formnovalidate
          />
          <label>Пароль:</label>
          <input
            type="password"
            id="new-user-password"
            name="password"
            value={this.state.password}
            onChange={this.handleUserInput}

          />
          <label>Повторите пароль:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            autoComplete=''
          />
          <button type="submit"
            disabled={!this.state.formValid}>Регистрация</button>
          <p>Уже зарегистрированы? <span className='register-link' onClick={(e) => startPageModel.signInOnClick(e)}>Войти</span></p>
          <div className='formErrors'>
            {Object.keys(this.state.formErrors).map((fieldName, i) => {
              if (this.state.formErrors.email.length > 0) {
                return (
                  <p key={i}>{fieldName} {this.state.formErrors.email}</p>
                )
              } else {
                return '';
              }
            })}
          </div>
        </form>
      </div>
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid &&
        this.state.passwordValid,
    });
  }

  validateField(fieldName: string, value: string) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.formValid;
    switch (fieldName) {
      case 'email':
        if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) == null) {
          fieldValidationErrors.email = 'Некорректный Email';
          emailValid = false;
        } else {
          fieldValidationErrors.email = 'Некорректный Email';
          emailValid = true;
        }  
        break;
      case 'password':
        if (value.length > 8) {
          fieldValidationErrors.password = 'Пароль слишком короткий';
          passwordValid = false;
        } else {
          fieldValidationErrors.password = 'Пароль слишком короткий';
          passwordValid = true;
        }
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
    }, this.validateForm);
  }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;
    const name = elem.name;
    const value = elem.value;
    this.setState({ [name]: value });
    const a = () => { this.validateField(name, value) };
    a();
  }
}

export { RegisterForm };