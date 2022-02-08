import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';
import { IUser } from '../interfaces/userInterface';

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

  getUserData(e: React.MouseEvent<HTMLButtonElement>) {
    const user: IUser = {
      
    }
    console.log(this.currentMail, this.currentPassword);
  }
}

const applicationModel = new ApplicationModel(newDataService);

export { applicationModel };