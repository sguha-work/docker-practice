import DBService from './db.js';
import * as employeeModel from '../model/employee_model.js';
class EmployeeService {
    constructor() {}
    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                await DBService.connect('teacherx');
                const result = await DBService.find(employeeModel.default);
                DBService.disConnect();
                resolve(result);
            } catch (error) {
                console.log('service error', error)
                reject(error);
            } finally {

            }
        });
    }

    create({ name, phonenumber, address, photo, sex }) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.dbService.connect('teacher');
                const employee = new employeeModel.default({ name, phonenumber, address, photo, sex });
                const result = await this.dbService.save(employee);
                this.dbService.disConnect();
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
            }
        });
    }
}
export default EmployeeService;