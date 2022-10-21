import DBService from './db.js';
import * as employeeModel from '../model/employee_model.js';
const dbServiceInstance = DBService.getInstance();
class EmployeeService {
    constructor() {
        this.instance = null;
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new EmployeeService();
        }
        return this.instance;
    }
    async findAll() {
        try {
            await dbServiceInstance.connect('teacherx');
            const result = await dbServiceInstance.find(employeeModel.default);
            dbServiceInstance.disConnect();
            return Promise.resolve(result);
        } catch (error) {
            console.log('service error', error)
            return Promise.reject(error);
        }
    }

    // create({ name, phonenumber, address, photo, sex }) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await this.dbService.connect('teacher');
    //             const employee = new employeeModel.default({ name, phonenumber, address, photo, sex });
    //             const result = await this.dbService.save(employee);
    //             this.dbService.disConnect();
    //             resolve(result);
    //         } catch (error) {
    //             reject(error);
    //         } finally {
    //         }
    //     });
    // }
}
export default EmployeeService;