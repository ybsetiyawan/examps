const InvitationService = require('../services/invitation.service');
const ExamAttemptService = require('../services/examAttempt.service');

const ExamAttemptController = {
  start: async (req, res, next) => {
    try {
      const { token } = req.params;

      // 1. validasi token undangan
      const invitation = await InvitationService.validateToken(token);

      // 2. mulai / ambil attempt
      const attempt = await ExamAttemptService.start(invitation);

      res.json({
        success: true,
        data: attempt,
      });
    } catch (err) {
      next(err);
    }
  },

  finish: async (req, res, next) => {
    try {
      const { attempt_id } = req.body;

      const result =
        await ExamAttemptService.finish(attempt_id);

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ExamAttemptController;
