import { newDataService } from '../dataServer/dataService';
import { RequestWord } from '../interfaces/types';
import { ISignInResponse } from '../interfaces/userInterface';
import { changeHardsAction, updateAction } from '../store/actionCreators/actionCreators';
import store from '../store/store';


const wordHard = { difficulty: 'hard', optional: {} };
const wordEasy = { difficulty: 'easy', optional: {} };

class UserStorage {
  isAuthorize: boolean;

  group: number;

  page: number;

  hardWordsSimple: RequestWord[];

  easyWordsSimple: RequestWord[];

  private _auth: ISignInResponse;

  constructor() {
    this.isAuthorize = false;
    this.page = 0;
    this.group = 0;
    this.hardWordsSimple = [];
    this.easyWordsSimple = [];
    this._auth = {
      message: '',
      name: '',
      token: '',
      refreshToken: '',
      userId: '',
    };
    this.getAuthFromLocaleStorage();
    this.getPageGroupFromLocaleStorage();
  }

  
  public get auth() : ISignInResponse {
    return this._auth;
  }
  
  public set auth(v : ISignInResponse) {
    if (v.message === 'Authenticated') {
      this._auth = v;
      this.isAuthorize = true;
      this.setAuthToLocalStorage();
      this.gethardWordsSimple(); // when user has authorized
    } else {
      throw Error('Ошибка авторизации!');
    }
  }
  
  async getAuthFromLocaleStorage() {
    const auth: string | null = localStorage.getItem('userAuth');

    if (auth) {
      this.isAuthorize = true;
      this._auth = await JSON.parse(auth);
      await this.gethardWordsSimple();
      store.dispatch(updateAction(true));
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

  async gethardWordsSimple() {
    if (this.isAuthorize) {
      try {
        const allWords = await newDataService.getUserWords();
        this.hardWordsSimple = allWords.filter(word => word.difficulty === 'hard');
        this.easyWordsSimple = allWords.filter(word => word.difficulty === 'easy');
        store.dispatch(changeHardsAction(this.hardWordsSimple.map(item => item.wordId)));
      } catch (error) {
        this.hardWordsSimple = [];
        this.easyWordsSimple = [];
      }
    } else {
      this.easyWordsSimple = [];
      this.hardWordsSimple = [];
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
    this.gethardWordsSimple();
  }

  async addHardWord(wordId: string) {
    await newDataService.addHardWord(wordId, wordHard);
    await this.gethardWordsSimple();
  }

  async delHardWord(wordId: string) {
    await newDataService.deleteHardWord(wordId);
    await this.gethardWordsSimple();
  }

  async addEasyWord(wordId: string) {
    if (this.hardWordsSimple.some(word => word.wordId === wordId)) {
      this.delHardWord(wordId);
    }
    await newDataService.addHardWord(wordId, wordEasy);
    await this.gethardWordsSimple();
  }

  async delEasyWord(wordId: string) {
    await newDataService.deleteHardWord(wordId);
    await this.gethardWordsSimple();
  }
}

const userStorage = new UserStorage();
export { userStorage };