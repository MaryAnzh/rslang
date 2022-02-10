import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';
import { IUser, IUserRegisterResponse, ISignInUserInfo } from '../interfaces/userInterface';
import { authorizationAppModel } from './AuthorizationAppModel';
import { ErrorText } from '../views/elements/errorText/errorText';
import { JsxFlags } from 'typescript';

class ApplicationModel {
  //принимаем данные
  dataServ: DataService;

  currentMail: string;

  currentPassword: string;

  isAuthorization: boolean;

  currentUserName: string;

  currentUserId: string;

  isServerError: boolean;

  currentTextError: string;


  constructor(dataServ: DataService) {
    this.dataServ = dataServ;
    this.currentMail = '';
    this.currentPassword = '';
    this.isAuthorization = false;
    this.currentUserName = '';
    this.currentUserId = '';
    this.isServerError = true;
    this.currentTextError = 'Тестирование';
  }

  async registerUser() {
    const user: IUser = {
      name: this.currentUserName,
      email: this.currentMail,
      password: this.currentPassword,
    }
    try {
      const registerResponse: IUserRegisterResponse = await this.dataServ.registereUser(user);
      this.currentUserId = registerResponse.id;
    } catch (error) {
      const serverError = error as Error;
      this.catchError(serverError);
      authorizationAppModel.errorMessage('register');
    }
  }

  async signInUser() {
    const signInInfo: ISignInUserInfo = {
      email: this.currentMail,
      password: this.currentPassword,
    }
    try {
      const a = await this.dataServ.signInUser(signInInfo);
      console.log(a);
    } catch (error) {
      const serverError = error as Error;
      this.catchError(serverError);
      authorizationAppModel.errorMessage('signin');
    }
  }

  catchError(error: Error) {
    const message = error.message;
    console.log('message');
    console.log(message);
    switch (message) {
      case '417':
        this.currentTextError = 'Такой e-mail уже существует.';
        console.log('Ошибка 417, я тебя поймал');
        break;
      case '422':
        this.currentTextError = 'Вы ввели некорректный e-mail или пароль';
        console.log('Ошибка 422, я тебя поймал');
        break;
      case '403':
        this.currentTextError = 'Вы ввели неверный e-mail или пароль';
        console.log('Ошибка 403, я тебя поймал');
        break;

      default:
        break;
    }
  }

  removeUserDataMainInfo() {
    this.currentUserName = '';
    this.currentMail = '';
    this.currentPassword = '';
  }
}

const applicationModel = new ApplicationModel(newDataService);

export { applicationModel };