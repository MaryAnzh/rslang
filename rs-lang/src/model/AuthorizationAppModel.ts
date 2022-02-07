import { DataService } from '../dataServer/dataService';;

class ApplicationModelCars {
	//принимаем данные
	private dataService: DataService;

	constructor(dataService: DataService) {
		this.dataService = dataService;
	}
}

//URL в скобках
const base = ``;
const dataService = new DataService(base);
const applicationModelCars = new ApplicationModelCars(dataService);

export { ApplicationModelCars };