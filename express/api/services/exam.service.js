const { v4: uuidv4 } = require('uuid');
const ExamRepo = require('../repositories/exam.repo');

const ExamService = {
  create: async (payload) => {
    const { title, duration_minutes, created_by } = payload;

    if (!title) {
      throw new Error('Judul ujian wajib diisi');
    }

    if (!duration_minutes || duration_minutes <= 0) {
      throw new Error('Durasi ujian tidak valid');
    }

    if (!created_by) {
      throw new Error('Admin tidak valid');
    }

    const exam = {
      id: uuidv4(),
      title: payload.title,
      description: payload.description,
      duration_minutes: payload.duration_minutes,
      start_at: payload.start_at,
      end_at: payload.end_at,
      created_by
    };

    return ExamRepo.create(exam);
  },
};

module.exports = ExamService;
