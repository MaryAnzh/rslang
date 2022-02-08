import React from 'react';
import '../RegisterForm/registerForm.scss';
import './SignInForm.scss';
import { startPageModel } from '../../../model/StartPageModel';
import { applicationModel } from '../../../model/ApplicationModel';

class SignInForm extends React.Component {
  render() {
    return (
			<div className="register-form-wrap">
				<h2>Вход:</h2>
				<form>
					<label form='username'>Имя:</label>
					<input
						type="username"
						id="username"
						name="username"
            aria-placeholder="Имя"
            onChange={(e) => { this.handleUserInput(e) }}
					//value={register.usernamr}
					//onChange={changeInputRegister}
					/>
					<label>Пароль:</label>
					<input
						type="password"
						id="password"
            name="password"
            onChange={(e) => { this.handleUserInput(e) }}
					//value={register.password}
					//onChange={changeInputRegister}
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
    const elem = e.target as HTMLInputElement;
    const name = elem.name;
    const value = elem.value;
    if (name == 'username') {
      applicationModel.currentMail = value;
    } else {
      applicationModel.currentPassword = value;
    }
    // this.setState({ [name]: value });
  }
}

export { SignInForm };