import { IUser, IUserLogInResponse, IUserRegisterResponse, ISignInResponse, ISignInUserInfo } from '../interfaces/userInterface';

class DataService {
  private baseURL: string;

  private user: string;

  private signin: string;

  public myStorage: Storage;

  get currentRefreshToken() {
    return this.myStorage.localStorage.getItem('refreshtoken');
  }

  set currentRefreshToken(value: string) {
    this.myStorage.localStorage.setItem('refreshtoken', value);
  }

  get currentToken() {
    return this.myStorage.localStorage.getItem('token');
  }

  set currentToken(value: string) {
    this.myStorage.localStorage.setItem('token', value);
  }

  // private currentRefreshToken: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.user = `${this.baseURL}/users`;
    this.signin = `${this.baseURL}/signin`;
    this.myStorage = window.localStorage;
  }

  async registereUser(newUser: IUser) {
    const response = await fetch(`${this.user}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const status = await response.status;
    if (status !== 200) {
      throw new Error(status.toString());
    } else {

      return response.json();
    }


  }

  async signInUser(user: ISignInUserInfo): Promise<ISignInResponse> {
    const response = await fetch(`${this.signin}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const responseJson: ISignInResponse = await response.json();
    this.currentToken = responseJson.token;
    this.currentRefreshToken = responseJson.refreshToken;

    const status = await response.status;
    if (status !== 200) {
      throw new Error(status.toString());
    } else {

      return responseJson;
    }

  }
}

const dataUrl = 'https://react-rslang-team-mary.herokuapp.com';
const newDataService = new DataService(dataUrl);
//user@mail.ru
//11111111

export { newDataService, DataService };
