const ExamService = require('../services/exam.service');

class ExamController {
  static async create(req, res) {
    try {
      const adminId = req.user.id; // dari JWT
      const exam = await ExamService.create({
        ...req.body,
        created_by: adminId
      });

      return res.status(201).json({
        success: true,
        data: exam
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  // static async getAll(req, res) {
  //   try {
  //     const exam = await ExamService.getAll();

  //     return res.json({
  //       success: true,
  //       data: exam
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
      await ExamService.getAllPaginatedSearch(page, limit, search);

    return res.json({
      success: true,
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
      search,
    });
  } catch (err) {
    next(err);
  }
}


  
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const employee = await ExamService.getById(id);

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

   static async update(req, res, next) {
    try {
      const { id } = req.params;

      const updated = await ExamService.update(id, req.body);

      return res.json({
        success: true,
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ExamController;
