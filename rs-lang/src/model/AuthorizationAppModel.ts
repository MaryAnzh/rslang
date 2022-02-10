import React from 'react';
import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';
import { applicationModel } from './ApplicationModel';

class AuthorizationAppModel {
  //принимаем данные
  dataServ: DataService;

  isMailValid = false;

  isPasswordValid = false;

  isPasswordRepeatValid = false;

  isRegisterForm = false;

  isSignInForm = false;

  constructor(dataServ: DataService) {
    this.dataServ = dataServ;
  }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;
    const name = elem.name;
    const value = elem.value;
    return { [name]: value };
  }

  hiddenELem(isWrapHudden: boolean, isRegisterHidden: boolean, isSignInHidden: boolean) {
    applicationModel.removeUserDataMainInfo();
    const formWrap = document.getElementById('headerForm');
    const formBody = document.getElementById('form-body');
    const registerForm = document.getElementById('register-form');
    const signInForm = document.getElementById('sign-in-form');
    if (isWrapHudden === false) {
      if (formWrap !== null) {
        formWrap.style.display = 'flex';
      }
    } else {
      if (formWrap !== null) {
        formWrap.style.display = 'none';
      }
    }

    if (isRegisterHidden && !isSignInHidden) {
      if (registerForm !== null && formBody !== null && signInForm !== null) {
        registerForm.style.display = 'flex';
        signInForm.style.display = 'none';
        formBody.classList.remove('pop-up__body-sign-in-form');
        formBody.classList.add('pop-up__body-register-form');
      }
    } else {
      if (registerForm !== null && signInForm !== null && formBody !== null) {
        registerForm.style.display = 'none';
        signInForm.style.display = 'flex';
        formBody.classList.remove('pop-up__body-register-form');
        formBody.classList.add('pop-up__body-sign-in-form');
      }
    }
  }

  registerOnClick(e: React.MouseEvent<HTMLElement | HTMLSpanElement>) {
    this.isRegisterForm = true;
    this.isSignInForm = false;
    this.remuveFormValidFlags();
    const isWrapHudden = false;
    const registerForm = true;
    const signInForm = false;
    this.hiddenELem(isWrapHudden, registerForm, signInForm);
  }

  signInOnClick(e: React.MouseEvent<HTMLLIElement | HTMLSpanElement>) {
    this.isRegisterForm = false;
    this.isSignInForm = true;
    this.remuveFormValidFlags();
    const isWrapHudden = false;
    const registerForm = false;
    const signInForm = true;
    this.hiddenELem(isWrapHudden, registerForm, signInForm);
  }

  errorMessage(formType: string) {
    const registerform = document.getElementById('register-form');
    const signinForm = document.getElementById('sign-in-form');
    
    if (this.isRegisterForm) {
      if (registerform !== null) {
        registerform.style.display = 'none';
      }
    } else {
      if (signinForm !== null) {
        signinForm.style.display = 'none';
      }
    }
    const formBody = document.getElementById('form-body');
    const errorForm = document.getElementById('server-error');
    const cross = document.getElementById('cross');

    if (formBody !== null && errorForm !== null && cross !== null) {

      formBody.classList.remove('pop-up__body-register-form');
      formBody.classList.add('pop-up__body-error');
      cross.style.display = 'none';
      errorForm.style.display = 'flex';
      const errorFormText = document.getElementById('server-error-text');
      if (errorFormText !== null) {
        errorFormText.textContent = applicationModel.currentTextError;
      }

    }
  }

  bavkToFormFromErrorOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    const formBody = document.getElementById('form-body');
    const cross = document.getElementById('cross');
    const errorForm = document.getElementById('server-error');
    if (formBody !== null && cross !== null && errorForm !== null) {
      formBody.classList.remove('pop-up__body-error');
      cross.removeAttribute('style');
      errorForm.removeAttribute('style');
    }
    if (this.isRegisterForm) {
      const isWrapHudden = false;
      const registerForm = true;
      const signInForm = false;
      this.hiddenELem(isWrapHudden, registerForm, signInForm);
    } else {
      const isWrapHudden = false;
      const registerForm = false;
      const signInForm = true;
      this.hiddenELem(isWrapHudden, registerForm, signInForm);
    }

  }

  remuveFormValidFlags() {
    this.isMailValid = false;
    this.isPasswordValid = false;
    this.isPasswordRepeatValid = false;
  }
}

const authorizationAppModel = new AuthorizationAppModel(newDataService);

export { authorizationAppModel };