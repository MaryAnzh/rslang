import { DataService } from '../dataServer/dataService';;

class ApplicationModelCars {
	//принимаем данные
	private dataService: DataService;

	constructor(dataService: DataService) {
		this.dataService = new DataService('');
	}
}

export { ApplicationModelCars };