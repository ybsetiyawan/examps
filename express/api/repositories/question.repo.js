const db = require("../config/db");

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
      data.order_no,
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

  findByExamId: async (examId) => {
    const result = await db.query(
      "SELECT * FROM questions WHERE exam_id = $1 ORDER BY order_no ASC",
      [examId],
    );
    return result.rows || [];
  },

  findByExamIdPaginated: async (examId, page = 1, limit = 10, search = "") => {
    const offset = (page - 1) * limit;
    const searchTerm = `%${search}%`;

    const dataQuery = `
    SELECT *
    FROM questions
    WHERE exam_id = $1
      AND question_text ILIKE $4
    ORDER BY order_no ASC
    LIMIT $2 OFFSET $3
  `;

    const countQuery = `
    SELECT COUNT(*) AS total
    FROM questions
    WHERE exam_id = $1
      AND question_text ILIKE $2
  `;

    const data = await db.query(dataQuery, [examId, limit, offset, searchTerm]);

    const count = await db.query(countQuery, [examId, searchTerm]);

    const total = Number(count.rows[0].total);

    return {
      data: data.rows || [],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  findById: async (id) => {
    const query = `
    SELECT *
    FROM questions
    WHERE id = $1
  `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  },

  update: async (id, data) => {
    const query = `
    UPDATE questions
    SET
      question_text = COALESCE($2, question_text),
      score = COALESCE($3, score),
      order_no = COALESCE($4, order_no)
    WHERE id = $1
    RETURNING *
  `;

    const values = [
      id,
      data.question_text || null,
      data.score || null,
      data.order_no || null,
    ];

    const result = await db.query(query, values);
    return result.rows[0] || null;
  },

  delete: async (id) => {
    const query = `
    DELETE FROM questions
    WHERE id = $1
    RETURNING *
  `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  },
};

module.exports = QuestionRepo;
