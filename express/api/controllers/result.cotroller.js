const ResultService = require('../services/result.service');

const ResultController = {
  getByAttempt: async (req, res, next) => {
    try {
      const { attemptId } = req.params;

      const result = await ResultService.getByAttempt(attemptId);

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ResultController;
