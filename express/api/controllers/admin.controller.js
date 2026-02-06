const AdminService = require('../services/admin.service');

class AdminController {
  static async register(req, res, next) {
    try {
      const admin = await AdminService.register(req.body);
      res.status(201).json({
        success: true,
        data: admin
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const result = await AdminService.login(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
