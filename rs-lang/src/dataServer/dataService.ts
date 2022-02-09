import { IUser, IUserLogInResponse, IUserRegisterResponse, ISignInResponse, ISignInUserInfo } from '../interfaces/userInterface';

class DataService {
  private baseURL: string;

  private user: string;

  private signin: string;

  private currentToken: string;

  private currentRefreshToken: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.user = `${this.baseURL}/users`;
    this.signin = `${this.baseURL}/signin`;
    this.currentToken = '';
    this.currentRefreshToken = '';
  }

  async registereUser(newUser: IUser): Promise<IUserRegisterResponse> {
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
    return responseJson;
  }

}

const dataUrl = 'https://react-rslang-team-mary.herokuapp.com';
const newDataService = new DataService(dataUrl);
//user@mail.ru
//11111111

export { newDataService, DataService };
