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
}

module.exports = ExamController;
