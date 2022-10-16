import EmployeeService from "../services/employee_service.js";
class EmployeeController {
    constructor() {
        this.employeeService = new EmployeeService();
    }
    findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.employeeService.findAll();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    create({ name, phonenumber, address, photo, sex }) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.employeeService.create({ name, phonenumber, address, photo, sex });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
}
export default EmployeeController;