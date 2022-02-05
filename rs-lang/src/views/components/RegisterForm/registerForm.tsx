import React from 'react';
import './registerForm.scss';

class RegisterForm extends React.Component {
  render() {
    return (
      <div className="register-form">
        <h2>Регистрация:</h2>
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
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            //value={register.email}
            //onChange={changeInputRegister}
            //formnovalidate
          />
          <label>Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            //value={register.password}
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
        </form>
      </div>
    );
  }
}

export { RegisterForm };