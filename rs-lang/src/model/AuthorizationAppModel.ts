import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';

class AuthorizationAppModel {
  //принимаем данные
  dataServ: DataService;

  currentMail: string;

  currentPassword: string;

  constructor(dataServ: DataService) {
    this.dataServ = dataServ;
    this.currentMail = '';
    this.currentPassword = '';
  }

  getUserData() {
    const email = <HTMLInputElement>document.getElementById('new-user-email');
    const password = <HTMLInputElement>document.getElementById('new-user-password');
    const emailValue = email.value;
    const passwordValue = password.value;
  }
}

const authorizationAppModel = new AuthorizationAppModel(newDataService);

export { authorizationAppModel };