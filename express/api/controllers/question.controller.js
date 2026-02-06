const QuestionService = require('../services/question.service');

class QuestionController {
  static async create(req, res) {
    try {
      const { examId } = req.params;
      const question = await QuestionService.create(examId, req.body);

      return res.status(201).json({
        success: true,
        data: question
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = QuestionController;
