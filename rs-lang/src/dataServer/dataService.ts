import { IUser, IUserLogInResponse, IUserRegisterResponse } from '../interfaces/userInterface';

class DataService {
  private baseURL: string;

  private user: string;

  private signin: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.user = `${this.baseURL}/users`;
    this.signin = `${this.baseURL}/signin`;
  }

  async createUser(newUser: IUser) {
    const response = await fetch(`${this.user}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    return <IUserRegisterResponse>(await response.json());
  }

  async signinUser(user: IUser) {
    const response = await fetch(`${this.user}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const a = <IUserLogInResponse>(await response.json());
    console.log('Этaп 2');
    console.log('Запрос отработал');
    console.log(a);
    return a;
  }
}

const dataUrl = 'https://react-rslang-team-mary.herokuapp.com';
const newDataService = new DataService(dataUrl);
//user@mail.ru
//11111111

export { newDataService, DataService };
