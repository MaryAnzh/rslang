import { PaginatedResults, RequestWord, RequestWordBody, WordCardType } from '../interfaces/types';
import { IUser, IUserLogInResponse, IUserRegisterResponse, ISignInResponse, ISignInUserInfo } from '../interfaces/userInterface';
import { userStorage } from '../model/UserStorage';

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

  async addHardWord(wordId: string, word: RequestWordBody): Promise<boolean | RequestWord> {
    if (userStorage.isAuthorize) {
      try {
        const response = await fetch(`${this.user}/${userStorage.auth.userId}/words/${wordId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userStorage.auth.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(word),
        });
  
        const responseJson: RequestWord = await response.json();
        return responseJson;
      } catch (error) {
        return false; // if token is ended
      }
    } else 
      return false;
  }

  async getHardWords() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userStorage.auth.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${this.user}/${userStorage.auth.userId}/words`, requestOptions);
    return <RequestWord[]>(await response.json());
  }

  async getHardWordsAsList() {
    const result = await this.getHardWords();
    const list = result.map(item => item.wordId);
    return list;
  }

  async getAgrHardWords(): Promise<WordCardType[]> {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userStorage.auth.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${this.user}/${userStorage.auth.userId}/aggregatedWords?page=0&wordsPerPage=1000&filter=%7B%22userWord.difficulty%22%3A%22hard%22%7D`, requestOptions);
    const results = <PaginatedResults[]>(await response.json());
    return results[0].paginatedResults;
  }
}

const dataUrl = 'https://react-rslang-team-mary.herokuapp.com';
const newDataService = new DataService(dataUrl);
//user@mail.ru
//11111111

export { newDataService, DataService };
