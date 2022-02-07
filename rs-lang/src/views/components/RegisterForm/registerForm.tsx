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
            value={ this.state.email }
            //value={register.email}
            //onChange={changeInputRegister}
            //formnovalidate
          />
          <label>Пароль:</label>
          <input
            type="password"
            id="new-user-password"
            name="password"
            value={ this.state.password }
            //onChange={changeInputRegister}
          />
          <label>Повторите пароль:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            autoComplete=''
            //value={register.password2}
            //onChange={changeInputRegister}
          />
          <button type="submit">Регистрация</button>
          <p>Уже зарегистрированы? <span className='register-link' onClick={(e) => startPageModel.signInOnClick(e)}>Войти</span></p>
        </form>
      </div>
    );
  }

  handleUserInput = (e: React.MouseEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;
    const name = elem.name;
    const value = elem.value;
    this.setState({ [name]: value });
  }
}

export { RegisterForm };