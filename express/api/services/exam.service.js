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

  
  getAll: async () => {
    return ExamRepo.findAll();
  },

   
  getById: async (id) => {
    const exams = await ExamRepo.findById(id);
    if (!exams) {
      throw new Error('Exams tidak ditemukan');
    }
    return exams;
  },

  getAllPaginatedSearch: async (page = 1, limit = 10, search = '') => {
  return await ExamRepo.findAllPaginatedSearch(page, limit, search);
},

  

  
  update: async (id, payload) => {
    if (!id) {
      throw new Error('Exams id wajib diisi');
    }

    const existing = await ExamRepo.findById(id);
    if (!existing) {
      throw new Error('Exams tidak ditemukan');
    }

    const updated = await ExamRepo.update(id, payload);
    if (!updated) {
      throw new Error('Gagal mengupdate exams');
    }

    return updated;
  },


};

module.exports = ExamService;
