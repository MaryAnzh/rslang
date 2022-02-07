import { DataService } from '../dataServer/dataService';;

class AuthorizationAppModel {
	//принимаем данные
	private dataService: DataService;

	constructor(dataService: DataService) {
		this.dataService = dataService;
	}
}

//URL в ''
const base = ``;
const dataService = new DataService(base);
const authorizationAppModel = new AuthorizationAppModel(dataService);

export { authorizationAppModel };