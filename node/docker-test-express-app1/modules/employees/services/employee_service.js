import DBService from './db.js';
import * as employeeModel from '../model/employee_model.js';
class EmployeeService {
    constructor() {
        this.dbService = new DBService();
    }
    findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.dbService.connect('teacher');
                const result = await this.dbService.find(employeeModel.default);
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                this.dbService.disConnect();
            }
        });
    }

    create({ name, phonenumber, address, photo, sex }) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.dbService.connect('teacher');
                const employee = new employeeModel.default({ name, phonenumber, address, photo, sex });
                const result = await this.dbService.save(employee);
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                this.dbService.disConnect();
            }
        });
    }
}
export default EmployeeService;