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
// 
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

  
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const employee = await EmployeeService.getById(id);

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

  // static async getAll(req, res) {
  //   try {
  //     const employees = await EmployeeService.getAll();

  //     return res.json({
  //       success: true,
  //       data: employees
  //     });
  //   } catch (err) {
  //     return res.status(500).json({
  //       success: false,
  //       message: err.message
  //     });
  //   }
  // }

  static async getAll(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';

    const result =
      await EmployeeService.getAllPaginatedSearch(page, limit, search);

    return res.json({
      success: true,
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
      search, // biar frontend tahu kata kuncinya
    });
  } catch (err) {
    next(err);
  }
}



   static async update(req, res, next) {
    try {
      const { id } = req.params;

      const updated = await EmployeeService.update(id, req.body);

      return res.json({
        success: true,
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }

  static async softDelete(req, res, next) {
    try {
      const { id } = req.params;

      const deleted = await EmployeeService.softDelete(id);

      return res.json({
        success: true,
        data: deleted,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EmployeeController;
