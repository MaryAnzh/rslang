import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';
import { IUser, IUserRegisterResponse, ISignInUserInfo, IGetUser } from '../interfaces/userInterface';
import { authorizationAppModel } from './AuthorizationAppModel';
import { userStorage } from './UserStorage';
import { WordCardType } from '../interfaces/types';


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

  currentWordArray: WordCardType[];

  gameLevel = 0;

  gamePage = 0;

  gameFromBook: boolean;

  isBergerOpen = false;

  constructor(dataServ: DataService) {
    this.dataServ = dataServ;
    this.currentMail = '';
    this.currentPassword = '';
    this.isAuthorization = false;
    this.gameFromBook = false;
    this.currentUserName = '';
    this.currentUserId = '';
    this.isServerError = true;
    this.currentTextError = 'Тестирование';
    this.currentWordArray = [];
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
      this.currentUserName = registerResponse.email;
      return true;
    } catch (error) {
      const serverError = error as Error;
      this.catchError(serverError);
      authorizationAppModel.errorMessage('register');
      return false;
    }
  }

  async signInUser() {
    const signInInfo: ISignInUserInfo = {
      email: this.currentMail,
      password: this.currentPassword,
    }
    try {
      const response = await this.dataServ.signInUser(signInInfo);

      userStorage.auth = response; // save user info in storage

      this.isAuthorization = true;
      this.currentUserName = response.name;
      console.log(`Добро пожаловать на сайт ${this.currentUserName}`);
      return true;

    } catch (error) {
      const serverError = error as Error;
      this.catchError(serverError);
      authorizationAppModel.errorMessage('signin');
      return false;
    }
  }

  async getUser() {
    try {
      const response: IGetUser = await this.dataServ.getUser();
      console.log('Ответ от getUser');
      console.log(response);
      this.currentMail = response.email;
      this.currentUserName = response.name;
      return true;
    } catch (error) {
      const serverError = error as Error;
      this.catchError(serverError);
      return false;
    }

  }

  catchError(error: Error) {
    const message = error.message;
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
      case '401':
        console.log('Срок действия токена истек');
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

  async getWords(level: number, page: number) {
    try {
      const response = await this.dataServ.getWords(level, page);
      this.currentWordArray = response;
      return response;
    } catch (error) {
      console.log('Слова не получены');
    }
  }
}

const applicationModel = new ApplicationModel(newDataService);

export { applicationModel };