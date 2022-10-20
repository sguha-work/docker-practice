import EmployeeService from "../services/employee_service.js";
import Controller from "./controller.js";
class EmployeeController {
    constructor() {
        this.employeeService = new EmployeeService();
    }
    findAll(request, response) {
        return Controller.handleRequest(request, response, EmployeeService.findAll);
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