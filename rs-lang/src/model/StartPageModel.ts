class StartPageModel {
  closeSignInOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const wrap = document.getElementById('headerForm');
    if (wrap !== null) {
      wrap.style.display = 'none';
    }
  }

  hiddenELem(isWrapHudden: boolean, isRegisterHidden: boolean, isSignInHidden: boolean) {
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
    const isWrapHudden = false;
    const registerForm = true;
    const signInForm = false;
    this.hiddenELem(isWrapHudden, registerForm, signInForm);
  }

  signInOnClick(e: React.MouseEvent<HTMLLIElement | HTMLSpanElement>) {
    const isWrapHudden = false;
    const registerForm = false;
    const signInForm = true;
    this.hiddenELem(isWrapHudden, registerForm, signInForm);
  }
}

const startPageModel = new StartPageModel();

export { startPageModel };