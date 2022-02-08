import { IUser, IUserStatus } from '../interfaces/userInterface';

class DataService {
  private baseURL: string;

  private user: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.user = `${this.baseURL}/users`;
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
    return (response.json());
  }

  async logInUser(user: IUser) {
    const response = await fetch(`${this.user}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return <IUserStatus>(await response.json());
  }
}

const dataUrl = '';
const newDataService = new DataService(dataUrl);

export { newDataService, DataService };
