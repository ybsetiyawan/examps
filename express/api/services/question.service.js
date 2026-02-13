const { v4: uuidv4 } = require("uuid");
const QuestionRepo = require("../repositories/question.repo");

const QuestionService = {
  create: async (examId, payload) => {
    const { question_text, score, order_no } = payload;

    if (!question_text) {
      throw new Error("Pertanyaan wajib diisi");
    }

    if (!order_no || order_no <= 0) {
      throw new Error("Urutan soal tidak valid");
    }

    const question = {
      id: uuidv4(),
      exam_id: examId,
      question_text,
      score: score ?? 1,
      order_no,
    };

    return QuestionRepo.create(question);
  },

  getByExamId: async (examId) => {
    if (!examId) {
      throw new Error("examId wajib diisi");
    }

    const questions = await QuestionRepo.findByExamId(examId);

    // boleh kosong — artinya exam belum punya soal
    return questions;
  },

  getByExamIdPaginated: async (examId, page = 1, limit = 10, search = "") => {
    if (!examId) {
      throw new Error("examId wajib diisi");
    }

    return await QuestionRepo.findByExamIdPaginated(
      examId,
      page,
      limit,
      search,
    );
  },

  getById: async (questionId) => {
    if (!questionId) {
      throw new Error("questionId wajib diisi");
    }

    const question = await QuestionRepo.findById(questionId);

    if (!question) {
      throw new Error("Soal tidak ditemukan");
    }

    return question;
  },

  update: async (id, payload) => {
    if (!id) {
      throw new Error("question id wajib diisi");
    }

    const updated = await QuestionRepo.update(id, payload);
    if (!updated) {
      throw new Error("Soal tidak ditemukan atau gagal diupdate");
    }

    return updated;
  },

  delete: async (id) => {
    if (!id) {
      throw new Error("question id wajib diisi");
    }

    const deleted = await QuestionRepo.delete(id);
    if (!deleted) {
      throw new Error("Soal tidak ditemukan atau gagal dihapus");
    }

    return deleted;
  },
};

module.exports = QuestionService;
