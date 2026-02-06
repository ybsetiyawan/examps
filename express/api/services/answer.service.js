const { v4: uuidv4 } = require('uuid');
const AnswerRepo = require('../repositories/answer.repo');
const ExamAttemptRepo = require('../repositories/examAttempt.repo');
const db = require('../config/db');

const AnswerService = {
  submit: async (invitation, { question_id, selected_option_id }) => {
    if (!question_id || !selected_option_id) {
      throw new Error('Data jawaban tidak lengkap');
    }

    // 🔐 Cari attempt milik peserta ini (AMAN)
    const attempt = await ExamAttemptRepo.findByInvitationId(invitation.id);
    if (!attempt) {
      throw new Error('Anda belum memulai ujian');
    }

    const attempt_id = attempt.id;

    // 1️⃣ Cek apakah soal sudah pernah dijawab
    const existing = await AnswerRepo.findByAttemptAndQuestion(
      attempt_id,
      question_id
    );

    if (existing) {
      throw new Error('Soal ini sudah dijawab');
    }

    // 2️⃣ Cek benar/salah dari options
    const optionResult = await db.query(
      `SELECT is_correct FROM options WHERE id = $1`,
      [selected_option_id]
    );

    if (!optionResult.rows.length) {
      throw new Error('Pilihan jawaban tidak ditemukan');
    }

    const isCorrect = optionResult.rows[0].is_correct;
    const score = isCorrect ? 1 : 0;

    // 3️⃣ Simpan jawaban
    const answer = {
      id: uuidv4(),
      attempt_id,
      question_id,
      selected_option_id,
      is_correct: isCorrect,
      score,
    };

    return AnswerRepo.create(answer);
  },
};

module.exports = AnswerService;
