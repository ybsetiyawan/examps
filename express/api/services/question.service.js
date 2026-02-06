const { v4: uuidv4 } = require('uuid');
const QuestionRepo = require('../repositories/question.repo');

const QuestionService = {
  create: async (examId, payload) => {
    const { question_text, score, order_no } = payload;

    if (!question_text) {
      throw new Error('Pertanyaan wajib diisi');
    }

    if (!order_no || order_no <= 0) {
      throw new Error('Urutan soal tidak valid');
    }

    const question = {
      id: uuidv4(),
      exam_id: examId,
      question_text,
      score: score ?? 1,
      order_no
    };

    return QuestionRepo.create(question);
  }
};

module.exports = QuestionService;
