const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');
const auth = require('../middleware/auth');


// create employee
router.post('/', auth, EmployeeController.create);

// get employee by NIK
// get all employees
router.get('/', auth, EmployeeController.getAll);
router.get('/:id', auth, EmployeeController.getById);
router.get('/nik/:nik', auth, EmployeeController.getByNik);

router.put('/:id', auth, EmployeeController.update);      // edit
router.patch('/:id', auth, EmployeeController.softDelete); // soft delete


module.exports = router;
