const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');

// create employee
router.post('/', EmployeeController.create);

// get employee by NIK
router.get('/nik/:nik', EmployeeController.getByNik);
// get all employees
router.get('/', EmployeeController.getAll);


module.exports = router;
