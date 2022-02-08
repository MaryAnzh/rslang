import { IUser, IUserLogInResponse, IUserRegisterResponse, ISignInResponse, ISignInUserInfo } from '../interfaces/userInterface';

class DataService {
  private baseURL: string;

  private user: string;

  private signin: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.user = `${this.baseURL}/users`;
    this.signin = `${this.baseURL}/signin`;
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

  async signInUser(user: ISignInUserInfo): Promise<IUserRegisterResponse> {
    const response = await fetch(`${this.signin}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return <IUserRegisterResponse>(await response.json());
  }
}

const dataUrl = 'https://react-rslang-team-mary.herokuapp.com';
const newDataService = new DataService(dataUrl);
//user@mail.ru
//11111111

export { newDataService, DataService };
