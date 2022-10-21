import express from 'express';
const router = express.Router();
import EmployeeController from './../controllers/employee_controller.js';
const employeeController = EmployeeController.getInstance();

router.get('/', async (request, response) => {// read, fetch all employee data
    const result = await employeeController.findAll(request, response);
    return result;
});

router.get('/:employee_id', async (request, response) => {// read, fetch perticuler employee data
    const result = await employeeController.findAll(request, response);
    return result;
});

router.post('/', async (request, response) => {// create, create new employee
    let responseObj = {};
    responseObj.status = 201;
    responseObj.data = {};
    responseObj.message = '';
    try {
        console.log(request.body);
        const result = await employeeController.create(request.body);
        responseObj.data = result;
        response.send(responseObj);
    } catch (error) {
        responseObj.status = error.code ? error.code : 500;
        responseObj.message = error.message ? error.message : "Error occured in code";
        response.send(responseObj);
    }
});

router.patch('/:employee_id', (request, response) => {// update, update perticuler teacher
    let responseObj = {};
    responseObj.status = 201;
    responseObj.data = {};
    response.send(responseObj);
});

router.delete('/:employee_id', (request, response) => {// delete, delete perticuler teacher
    let responseObj = {};
    responseObj.status = 203;
    responseObj.data = {};
    response.send(responseObj);
});

export default router;