class StartPageModule {
  closeSignInOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const wrap = document.getElementById('headerForm');
    if (wrap !== null) {
      wrap.style.display = 'none';
    }
  }

  hiddenELem(isWrapHudden: boolean, isRegisterHidden: boolean, isSignInHidden: boolean) {
    const formWrap = document.getElementById('headerForm');
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
      if (registerForm !== null) {
        registerForm.style.display = 'flex';
      }
      if (signInForm !== null) {
        signInForm.style.display = 'none';
      }
    } else {
      if (registerForm !== null) {
        registerForm.style.display = 'none';
      }
      if (signInForm !== null) {
        signInForm.style.display = 'flex';
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

const startPageModule = new StartPageModule();

export { startPageModule };