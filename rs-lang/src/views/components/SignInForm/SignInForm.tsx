import React from 'react';
import '../RegisterForm/registerForm.scss';
import './SignInForm.scss';
import { startPageModel } from '../../../model/StartPageModel';

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
					//value={register.usernamr}
					//onChange={changeInputRegister}
					/>
					<label>Пароль:</label>
					<input
						type="password"
						id="password"
						name="password"
					//value={register.password}
					//onChange={changeInputRegister}
					/>
					<button type="submit">Войти</button>
				<p>Нет акаунта? <span onClick={(e) => startPageModel.registerOnClick(e)}>
					Зарегистрироваться</span></p>
				</form>
			</div>
    );
  }
}

export { SignInForm };