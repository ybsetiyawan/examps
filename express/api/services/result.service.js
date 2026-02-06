const ResultRepo = require('../repositories/result.repo');

const ResultService = {
  getByAttempt: async (attemptId) => {
    if (!attemptId) {
      throw new Error('attemptId wajib diisi');
    }

    const rows = await ResultRepo.getResultByAttempt(attemptId);

    if (!rows || rows.length === 0) {
      throw new Error('Hasil ujian tidak ditemukan');
    }

    // ambil data attempt & employee dari baris pertama
    const first = rows[0];

    const result = {
      attempt: {
        id: first.attempt_id,
        started_at: first.started_at,
        finished_at: first.finished_at,
        total_score: first.total_score,
      },
      employee: {
        id: first.employee_id,
        nik: first.nik,
        name: first.name,
        spcd: first.spcd,
        spname: first.spname,
      },
      answers: [],
    };

    // mapping jawaban per soal
    rows.forEach(row => {
      if (row.question_text) {
        result.answers.push({
          question: row.question_text,
          selected: row.selected_answer,
          correct: row.is_correct,
          score: row.score,
        });
      }
    });

    return result;
  }
};

module.exports = ResultService;
