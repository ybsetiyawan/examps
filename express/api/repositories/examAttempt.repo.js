const db = require('../config/db');

const ExamAttemptRepository = {
  create: async (attempt) => {
    const query = `
      INSERT INTO exam_attempts (
        id, exam_id, invitation_id, started_at
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [
      attempt.id,
      attempt.exam_id,
      attempt.invitation_id,
      attempt.started_at,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  findByInvitationId: async (invitation_id) => {
    const query = `
      SELECT *
      FROM exam_attempts
      WHERE invitation_id = $1
      LIMIT 1
    `;
    const result = await db.query(query, [invitation_id]);
    return result.rows[0] || null;
  },

  updateFinish: async (attempt_id, total_score) => {
  const query = `
    UPDATE exam_attempts
    SET finished_at = NOW(),
        total_score = $2
    WHERE id = $1
    RETURNING *
  `;
  const result = await db.query(query, [attempt_id, total_score]);
  return result.rows[0];
}

};

module.exports = ExamAttemptRepository;
