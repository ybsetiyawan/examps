const QuestionParticipantService = require('../services/questionParticipant.service');
const InvitationService = require('../services/invitation.service');

const QuestionParticipantController = {
  getQuestions: async (req, res, next) => {
    try {
      const { token } = req.params;

      // pastikan token valid & belum selesai
      const invitation = await InvitationService.validateToken(token);

      const questions =
        await QuestionParticipantService.getByExamId(invitation.exam_id);

      res.json({
        success: true,
        data: questions,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = QuestionParticipantController;
