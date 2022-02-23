import { PaginatedResults, RequestWord, RequestWordBody, ResponseProgressBody, WordCardType } from '../interfaces/types';
import { IUser, IUserLogInResponse, IUserRegisterResponse, ISignInResponse, ISignInUserInfo, IGetUser } from '../interfaces/userInterface';
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

  async getUser() {
    const response = await fetch(`${this.user}/${userStorage.auth.userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userStorage.auth.token}`,
      },
    });
    const status = response.status;
    if (status !== 200) {
      throw new Error(status.toString());
    } else {
      return response.json();
    }
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
    const status = response.status;
    if (status !== 200) {
      throw new Error(status.toString());
    } else {
      return <IGetUser>(await response.json());
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

    const status = response.status;

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

  async getUserWords() {
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
    const result = await this.getUserWords();
    const list = result.filter(word => word.difficulty === 'hard').map(item => item.wordId);
    return list;
  }

  async getEasyWordsAsList() {
    const result = await this.getUserWords();
    const list = result.filter(word => word.difficulty === 'easy').map(item => item.wordId);
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

  async deleteHardWord(wordId: string): Promise<boolean> {
    if (userStorage.isAuthorize) {
      try {
        const response = await fetch(`${this.user}/${userStorage.auth.userId}/words/${wordId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${userStorage.auth.token}`,
          },
        });

        return response.status === 204;
      } catch (error) {
        return false; // if token is ended
      }
    } else
      return false;
  }

  async getProgressWord(wordId: string) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userStorage.auth.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const wordIdP = '4' + wordId.slice(1);
    const response = await fetch(`${this.user}/${userStorage.auth.userId}/words/${wordIdP}`, requestOptions);
    return <ResponseProgressBody>(await response.json());
  }
}

const dataUrl = 'https://react-rslang-team-mary.herokuapp.com';
const newDataService = new DataService(dataUrl);
//user@mail.ru
//11111111

export { newDataService, DataService };
