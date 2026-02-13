const QuestionService = require("../services/question.service");

class QuestionController {
  static async create(req, res) {
    try {
      const { examId } = req.params;
      const question = await QuestionService.create(examId, req.body);

      return res.status(201).json({
        success: true,
        data: question,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  // static async getByExamId(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const questions = await QuestionService.getByExamId(id);

  //     return res.json({
  //       success: true,
  //       data: questions
  //     });
  //   } catch (err) {
  //     return res.status(404).json({
  //       success: false,
  //       message: err.message
  //     });
  //   }
  // }

  // static async getByExam(req, res, next) {
  //   try {
  //     const { examId } = req.params;

  //     const questions = await QuestionService.getByExamId(examId);

  //     return res.json({
  //       success: true,
  //       data: questions,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  static async getByExam(req, res, next) {
    try {
      const { examId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search || "";

      const result = await QuestionService.getByExamIdPaginated(
        examId,
        page,
        limit,
        search,
      );

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

  static async getById(req, res, next) {
    try {
      const { questionId } = req.params;

      const question = await QuestionService.getById(questionId);

      return res.json({
        success: true,
        data: question,
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { questionId } = req.params;

      const updated = await QuestionService.update(questionId, req.body);

      return res.json({
        success: true,
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { questionId } = req.params;

      const deleted = await QuestionService.delete(questionId);

      return res.json({
        success: true,
        data: deleted,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuestionController;
