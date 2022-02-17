import { newDataService } from '../dataServer/dataService';
import { RequestWord } from '../interfaces/types';
import { ISignInResponse } from '../interfaces/userInterface';

class UserStorage {
  isAuthorize: boolean;

  group: number;

  page: number;

  hardWords: RequestWord[];

  private _auth: ISignInResponse;

  constructor() {
    this.isAuthorize = false;
    this.page = 0;
    this.group = 0;
    this.hardWords = [];
    this._auth = {
      message: '',
      name: '',
      token: '',
      refreshToken: '',
      userId: '',
    };
    this.getAuthFromLocaleStorage();
    this.getPageGroupFromLocaleStorage();
    // console.log(JSON.stringify(this._auth));
  }

  
  public get auth() : ISignInResponse {
    return this._auth;
  }
  
  public set auth(v : ISignInResponse) {
    if (v.message === 'Authenticated') {
      this._auth = v;
      this.isAuthorize = true;
      this.setAuthToLocalStorage();
      this.getHardWords(); // when user has authorized
    } else {
      throw Error('Ошибка авторизации!');
    }
  }
  
  async getAuthFromLocaleStorage() {
    const auth: string | null = localStorage.getItem('userAuth');

    if (auth) {
      this.isAuthorize = true;
      this._auth = await JSON.parse(auth);

      await this.getHardWords();
    }
  }

  getPageGroupFromLocaleStorage() {
    const group: string | null = localStorage.getItem('group');
    const page: string | null = localStorage.getItem('page');

    if (group) {
      this.group = +group;
    }
    if (page) {
      this.page = +page;
    }
  }

  setAuthToLocalStorage() {
    localStorage.setItem('userAuth', JSON.stringify(this._auth));
  }

  setPageGroupToLocalStorage(group: number = this.group, page: number = this.page) {
    this.group = group;
    this.page = page;
    localStorage.setItem('group', String(group));
    localStorage.setItem('page', String(page));
  }

  async getHardWords() {
    if (this.isAuthorize) {
      try {
        this.hardWords = (await newDataService.getHardWords());
      } catch (error) {
        this.hardWords = [];
      }
    } else {
      this.hardWords = [];
    }
  }

  clearAuth() {
    localStorage.removeItem('userAuth');
    this.isAuthorize = false;
    this._auth = {
      message: '',
      name: '',
      token: '',
      refreshToken: '',
      userId: '',
    };
    this.getHardWords();
  }
}

const userStorage = new UserStorage();
export { userStorage };