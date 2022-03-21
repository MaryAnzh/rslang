import React, { ReactElement } from 'react';
import './formErrors.scss';
import { applicationModel } from '../../../model/ApplicationModel';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';

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
            authorizationAppModel.isMailValid = false;
          } else {
            content = '';
            applicationModel.currentMail = propValue;
            authorizationAppModel.isMailValid = true;
          }
          break;
        case 'password':
          if (propValue.length < 8) {
            content = 'Пароль слишком короткий';
            authorizationAppModel.isPasswordValid = false;
          } else {
            content = '';
            applicationModel.currentPassword = propValue;
            authorizationAppModel.isPasswordValid = true;
          }
          break;
        case 'passwordRepeat':
          if (propValue != applicationModel.currentPassword) {
            content = 'Пароли не совпадают';
            authorizationAppModel.isPasswordRepeatValid = false;
          } else {
            content = '';
            authorizationAppModel.isPasswordRepeatValid = true;
          }
          break;

        default:
          break;
      }
    } else {
      switch (propName) {
        case 'email':
          applicationModel.currentMail = '';
          break;
        case 'password':
          applicationModel.currentPassword = '';
          break;
        default:
          break;
      }
    }

    return (
      <div className='formErrors'>
        <p className='formErrors__text'>{ content }</p>

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