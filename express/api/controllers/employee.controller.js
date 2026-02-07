const EmployeeService = require('../services/employee.service');

class EmployeeController {
  static async create(req, res) {
    try {
      const employee = await EmployeeService.create(req.body);
      return res.status(201).json({
        success: true,
        data: employee
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  static async getByNik(req, res) {
    try {
      const { nik } = req.params;
      const employee = await EmployeeService.getByNik(nik);

      return res.json({
        success: true,
        data: employee
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message
      });
    }
  }

  static async getAll(req, res) {
    try {
      const employees = await EmployeeService.getAll();

      return res.json({
        success: true,
        data: employees
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = EmployeeController;
