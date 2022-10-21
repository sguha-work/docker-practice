import EmployeeService from "../services/employee_service.js";
import Controller from "./controller.js";
const mainControllerInstance = Controller.getInstance();
const serviceInstance = EmployeeService.getInstance();

class EmployeeController {
    constructor() {
        this.instance = null;
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new EmployeeController();
        }
        return this.instance;
    }
    findAll(request, response) {
        return mainControllerInstance.handleRequest(request, response, serviceInstance.findAll);
    }

    // create({ name, phonenumber, address, photo, sex }) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const result = await this.employeeService.create({ name, phonenumber, address, photo, sex });
    //             resolve(result);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }
}
export default EmployeeController;