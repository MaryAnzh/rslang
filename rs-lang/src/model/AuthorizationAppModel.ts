import { newDataService } from '../dataServer/dataService';
import { DataService } from '../dataServer/dataService';

class AuthorizationAppModel {
	//принимаем данные
	dataServ: DataService;

	constructor(dataServ: DataService) {
		this.dataServ = dataServ;
	}
}

const authorizationAppModel = new AuthorizationAppModel(newDataService);

export { authorizationAppModel };