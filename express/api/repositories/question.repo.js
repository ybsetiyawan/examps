const db = require('../config/db');

const QuestionRepo = {
  create: async (data) => {
    const query = `
      INSERT INTO questions (
        id, exam_id, question_text, score, order_no
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      data.id,
      data.exam_id,
      data.question_text,
      data.score,
      data.order_no
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  },

   findByExamIdForParticipant: async (examId) => {
    const query = `
      SELECT
        q.id AS question_id,
        q.question_text,
        q.order_no,
        o.id AS option_id,
        o.label,
        o.text
      FROM questions q
      JOIN options o ON o.question_id = q.id
      WHERE q.exam_id = $1
      ORDER BY q.order_no, o.label
    `;
    const result = await db.query(query, [examId]);
    return result.rows;
  },
};

module.exports = QuestionRepo;
