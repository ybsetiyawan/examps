const db = require('../config/db');

const AnswerRepo = {
  create: async (answer) => {
    const query = `
      INSERT INTO answers (
        id,
        attempt_id,
        question_id,
        selected_option_id,
        is_correct,
        score
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      answer.id,
      answer.attempt_id,
      answer.question_id,
      answer.selected_option_id,
      answer.is_correct,
      answer.score,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  findByAttemptAndQuestion: async (attempt_id, question_id) => {
    const query = `
      SELECT *
      FROM answers
      WHERE attempt_id = $1
        AND question_id = $2
      LIMIT 1
    `;

    const result = await db.query(query, [attempt_id, question_id]);
    return result.rows[0] || null;
  },

  getTotalScoreByAttempt: async (attempt_id) => {
  const query = `
    SELECT COALESCE(SUM(score), 0) AS total_score
    FROM answers
    WHERE attempt_id = $1
  `;
  const result = await db.query(query, [attempt_id]);
  return Number(result.rows[0].total_score || 0);
}
};

module.exports = AnswerRepo;
