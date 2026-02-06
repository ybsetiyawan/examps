const QuestionRepo = require('../repositories/question.repo');

const QuestionParticipantService = {
  getByExamId: async (examId) => {
    const rows = await QuestionRepo.findByExamIdForParticipant(examId);

    if (!rows.length) return [];

    const map = {};

    rows.forEach((row) => {
      if (!map[row.question_id]) {
        map[row.question_id] = {
          id: row.question_id,
          text: row.question_text,
          order_no: row.order_no,
          options: [],
        };
      }

      map[row.question_id].options.push({
        id: row.option_id,
        label: row.label,
        text: row.text,
      });
    });

    return Object.values(map).sort((a, b) => a.order_no - b.order_no);
  },
};

module.exports = QuestionParticipantService;
