import express from 'express';
const router = express.Router();
import EmployeeController from './../controllers/employee_controller.js';
const employeeController = new EmployeeController();

router.get('/', async (request, response) => {// read, fetch all employee data
    let responseObj = {};
    responseObj.status = 200;
    responseObj.data = {};
    responseObj.message = '';
    try {
        const result = await employeeController.findAll();
        responseObj.data = result;
        response.send(responseObj);
    } catch (error) {console.error(error);
        responseObj.status = error.code?error.code:500;
        response.message = error.message?error.message:"Error occured in code";
        response.send(responseObj);
    }
});

router.get('/:employee_id', (request, response) => {// read, fetch perticuler employee data
    let responseObj = {};
    responseObj.status = 200;
    responseObj.data = {};
    response.send(responseObj);
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
        responseObj.status = error.code?error.code:500;
        response.message = error.message?error.message:"Error occured in code";
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