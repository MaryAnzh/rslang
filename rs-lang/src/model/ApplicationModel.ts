import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';

class ApplicationModel {
  //принимаем данные
  dataServ: DataService;

  currentMail: string;
  
  currentPassword: string;
  
  isAuthorization: boolean;


  constructor(dataServ: DataService) {
    this.dataServ = dataServ;
    this.currentMail = '';
    this.currentPassword = '';
    this.isAuthorization = false;
  }

  getUserData() {
    const email = <HTMLInputElement>document.getElementById('new-user-email');
    const password = <HTMLInputElement>document.getElementById('new-user-password');
    const emailValue = email.value;
    const passwordValue = password.value;
  }
}

const applicationModel = new ApplicationModel(newDataService);

export { applicationModel };