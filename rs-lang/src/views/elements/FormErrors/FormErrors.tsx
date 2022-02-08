import React, { ReactElement } from 'react';
import './formErrors.scss';
import { RegisterForm } from '../../components/RegisterForm/registerForm';
import { AppProperties } from '../../../interfaces/appProperties';

type FormErrorsProperties = {
  name: keyof FormErrorsProperties;
  email?: string;
  password?: string;
  passwordRepeat?: string;
}

class FormErrors extends React.Component<FormErrorsProperties> {
  
  render() {
    let content = '';
    const propName = this.props.name;
    const propValue = this.props[this.props.name];
    if (propValue !== undefined && propValue.length > 0) {
      switch (propName) {
        case 'email':
          if (propValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) == null) {
            content = 'Некорректный Email';
          } else {
            content = '';
          } 
          break;
        case 'password':
          if (propValue.length < 8) {
            content = 'Пароль слишком короткий';
          } else {
            content = '';
          } 
          break;
        case 'passwordRepeat':
          if (propValue !== this.props.password) {
            content = 'Пароли не совпадают';
          } else {
            content = '';
          }
          break;
      
        default:
          break;
      }
    }
    return (
      <div className='formErrors'>
        {console.log(this.props.name)}
        {console.log(this.props[this.props.name])}
        <p>{ content }</p>
        
        {/* {Object.entries(this.props.formErrorsObj).map(([fieldName, value], i) => {
				  if (value.length > 0) {
				    return (
							<p key={i}>{fieldName} {value}</p>
				    )
				  } else {
				    return '';
				  }
				})} */}
      </div>
    );
  }
  
}

export { FormErrors };