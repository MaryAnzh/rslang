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
}

class SignInForm extends React.Component {
  state: SignInFormState;

  constructor(props: AppProperties) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }
  
  render() {
    return (
			<div className="register-form-wrap">
				<h2>Вход:</h2>
				<form>
					<label form='username'>Имя:</label>
          <FormErrors email={this.state.email} name="email" />
          <input
            type="email"
            id="email"
            name="email"
            aria-placeholder="*Email"
            onChange={(e) => { this.handleUserInput(e) }}
					/>
					<label>*Пароль:</label>
          <FormErrors password={this.state.password} name="password" />
          <input
						type="password"
						id="password"
            name="password"
            onChange={(e) => { this.handleUserInput(e) }}
					/>
          <button type="button" onClick={(e) => { applicationModel.signInUser(e) }}
          >Войти</button>
				<p>Нет акаунта? <span onClick={(e) => startPageModel.registerOnClick(e)}>
					Зарегистрироваться</span></p>
				</form>
			</div>
    );
  }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = authorizationAppModel.handleUserInput(e);
    this.setState(a);
    //this.validateField(name, value);
  }
}

export { SignInForm };