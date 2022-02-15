import { WordCardType } from '../interfaces/types';
import { IUser, IUserLogInResponse, IUserRegisterResponse, ISignInResponse, ISignInUserInfo } from '../interfaces/userInterface';

class DataService {
  baseURL: string;

  private user: string;

  private signin: string;

  // public myStorage: Storage;

  private words: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.user = `${this.baseURL}/users`;
    this.signin = `${this.baseURL}/signin`;
    // this.myStorage = window.localStorage;
    this.words = `${this.baseURL}/words`;
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

    const status = await response.status;

    if (status !== 200) {
      throw new Error(status.toString());
    } else {
      const responseJson: ISignInResponse = await response.json();
      // this.myStorage.setItem('token', responseJson.token);
      //console.log(this.myStorage.getItem('token'));
      return responseJson;
    }
  }

  async getWords(group: number, page: number): Promise<WordCardType[]> {
    const requestOptions = {
      method: 'GET',
    };
    const response = await fetch(`${this.words}?group=${group}&page=${page}`, requestOptions);
    return <WordCardType[]>(await response.json());
  }
}

const dataUrl = 'https://react-rslang-team-mary.herokuapp.com';
const newDataService = new DataService(dataUrl);
//user@mail.ru
//11111111

export { newDataService, DataService };
