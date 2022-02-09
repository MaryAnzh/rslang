import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';
import { IUser, IUserRegisterResponse, ISignInUserInfo } from '../interfaces/userInterface';

class ApplicationModel {
  //принимаем данные
  dataServ: DataService;

  currentMail: string;

  currentPassword: string;

  isAuthorization: boolean;

  currentUserName: string;

  currentUserId: string;


  constructor(dataServ: DataService) {
    this.dataServ = dataServ;
    this.currentMail = '';
    this.currentPassword = '';
    this.isAuthorization = false;
    this.currentUserName = '';
    this.currentUserId = '';
  }

  async registerUser() {
    const user: IUser = {
      name: this.currentUserName,
      email: this.currentMail,
      password: this.currentPassword,
    }
    try {
      const registerResponse: IUserRegisterResponse = await this.dataServ.registereUser(user);
      this.currentUserId = registerResponse.id;
    } catch (error) {
      console.log('Такой маил уже есть')
    }

  }

  async signInUser(e: React.MouseEvent<HTMLButtonElement>) {
    const signInInfo: ISignInUserInfo = {
      email: this.currentMail,
      password: this.currentPassword,
    }
    const a = await this.dataServ.signInUser(signInInfo);
    console.log(a);
  }

  removeUserDataMainInfo() {
    this.currentUserName = '';
    this.currentMail = '';
    this.currentPassword = '';
  }
}

const applicationModel = new ApplicationModel(newDataService);

export { applicationModel };