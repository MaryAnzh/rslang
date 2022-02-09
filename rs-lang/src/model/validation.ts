class ValidatorModel {


  // constructor(dataServ: DataService) {
  //   this.dataServ = dataServ;
  // }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;
    const name = elem.name;
    const value = elem.value;
    return { [name]: value };
  }
}

const validatorModel = new ValidatorModel();

export { validatorModel };
  
  // validateForm() {
  //   this.setState({
  //     formValid: this.state.emailValid &&
  //       this.state.passwordValid,
  //   });
  // }

  // validateField(fieldName: string, value: string) {
  //   let fieldValidationErrors = this.state.formErrors;
  //   let emailValid = this.state.emailValid;
  //   let passwordValid = this.state.formValid;
  //   switch (fieldName) {
  //     case 'email':
  //       if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) == null) {
  //         fieldValidationErrors.email = 'Некорректный Email';
  //         emailValid = false;
  //       } else {
  //         fieldValidationErrors.email = '';
  //         emailValid = true;
  //       }  
  //       break;
  //     case 'password':
  //       if (value.length < 8) {
  //         fieldValidationErrors.password = 'Пароль слишком короткий';
  //         passwordValid = false;
  //       } else {
  //         fieldValidationErrors.password = '';
  //         passwordValid = true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState({
  //     formErrors: fieldValidationErrors,
  //     emailValid: emailValid,
  //     passwordValid: passwordValid,
  //   }, this.validateForm);
  // }