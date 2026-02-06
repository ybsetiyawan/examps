const db = require('../config/db');
const { v4: uuidv4 } = require("uuid");


const ExamRepository = {
  create: async (exam) => {
    const query = `
      INSERT INTO exams (
        id, title, description,
        duration_minutes, start_at, end_at, created_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const id = uuidv4();
    const values = [
      id,
      exam.title,
      exam.description || null,
      exam.duration_minutes,
      exam.start_at || null,
      exam.end_at || null,
      exam.created_by,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await db.query(
      'SELECT * FROM exams WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },
};

module.exports = ExamRepository;
