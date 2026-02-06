const db = require('../config/db');

const ResultRepo = {
  getResultByAttempt: async (attemptId) => {
    const query = `
      SELECT 
        ea.id AS attempt_id,
        ea.started_at,
        ea.finished_at,
        ea.total_score,

        e.id AS exam_id,

        emp.id AS employee_id,
        emp.nik,
        emp.name,
        emp.spcd,
        emp.spname,

        q.question_text,
        o.text AS selected_answer,
        a.is_correct,
        a.score

      FROM exam_attempts ea
      JOIN invitations i ON i.id = ea.invitation_id
      JOIN employees emp ON emp.id = i.employee_id
      JOIN exams e ON e.id = ea.exam_id
      LEFT JOIN answers a ON a.attempt_id = ea.id
      LEFT JOIN questions q ON q.id = a.question_id
      LEFT JOIN options o ON o.id = a.selected_option_id

      WHERE ea.id = $1
      ORDER BY q.order_no
    `;

    const result = await db.query(query, [attemptId]);
    return result.rows;
  }
};

module.exports = ResultRepo;
