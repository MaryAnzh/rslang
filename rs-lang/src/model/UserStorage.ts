import { ISignInResponse } from '../interfaces/userInterface';

class UserStorage {
  isAuthorize: boolean;

  group: number;

  page: number;

  private _auth: ISignInResponse;

  constructor() {
    this.isAuthorize = false;
    this.page = 0;
    this.group = 0;
    this._auth = {
      message: '',
      name: '',
      token: '',
      refreshToken: '',
      userId: '',
    };
    this.getAuthFromLocaleStorage();
    this.getPageGroupFromLocaleStorage();
    console.log(JSON.stringify(this._auth));
  }

  
  public get auth() : ISignInResponse {
    return this._auth;
  }
  
  public set auth(v : ISignInResponse) {
    if (v.message === 'Authenticated') {
      this.isAuthorize = true;
      this._auth = v;
      this.setAuthToLocalStorage();
    } else {
      throw Error('Ошибка авторизации!');
    }
  }
  
  getAuthFromLocaleStorage() {
    const auth: string | null = localStorage.getItem('userAuth');

    if (auth) {
      this._auth = JSON.parse(auth);
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
  }
}

const userStorage = new UserStorage();
export { userStorage };