import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';

class AuthorizationAppModel {
  //принимаем данные
  dataServ: DataService;

  constructor(dataServ: DataService) {
    this.dataServ = dataServ;
  }

  handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;
    const name = elem.name;
    const value = elem.value;
    return { [name]: value };
  }
}

const authorizationAppModel = new AuthorizationAppModel(newDataService);

export { authorizationAppModel };