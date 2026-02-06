const { v4: uuidv4 } = require('uuid');
const AnswerRepo = require('../repositories/answer.repo');
const ExamAttemptRepo = require('../repositories/examAttempt.repo');
const InvitationRepo = require('../repositories/invitation.repo');


const ExamAttemptService = {
  start: async (invitation) => {
    // cek apakah sudah pernah mulai
    const existing = await ExamAttemptRepo.findByInvitationId(invitation.id);
    if (existing) {
      return existing; // idempotent
    }

    const attempt = {
      id: uuidv4(),
      exam_id: invitation.exam_id,
      invitation_id: invitation.id,
      started_at: new Date(),
    };

    const created = await ExamAttemptRepo.create(attempt);

    // update status invitation
    await InvitationRepo.updateStatus(invitation.id, 'opened');

    return created;
  },

 
  finish: async (attempt_id) => {
    if (!attempt_id) {
      throw new Error('attempt_id wajib diisi');
    }

    // 1️⃣ hitung total score (repo answers)
    const totalScore =
      await AnswerRepo.getTotalScoreByAttempt(attempt_id);

    // 2️⃣ update attempt (repo exam_attempts)
    const attempt =
      await ExamAttemptRepo.updateFinish(attempt_id, totalScore);

    if (!attempt) {
      throw new Error('Attempt tidak ditemukan');
    }

    // 3️⃣ update status invitation (repo invitations)
    await InvitationRepo.updateStatus(
      attempt.invitation_id,
      'completed'
    );

    return attempt;
  }

};

module.exports = ExamAttemptService;
