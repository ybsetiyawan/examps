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

  
  findAll: async () => {
    const query = `
      SELECT *
      FROM exams
      ORDER BY created_at ASC
    `;
    const result = await db.query(query);
    return result.rows || [];
  },

  findAllPaginatedSearch: async (page = 1, limit = 10, search = '') => {
  const offset = (page - 1) * limit;
  const searchTerm = `%${search}%`;

  const dataQuery = `
    SELECT *
    FROM exams
    WHERE (
      title ILIKE $3
      OR description ILIKE $3
    )
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM exams
    WHERE (
      title ILIKE $1
      OR description ILIKE $1
    )
  `;

  const data = await db.query(dataQuery, [limit, offset, searchTerm]);
  const count = await db.query(countQuery, [searchTerm]);

  const total = Number(count.rows[0].total);

  return {
    data: data.rows || [],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
},




  
  update: async (id, data) => {
  const query = `
    UPDATE exams
    SET 
      title = COALESCE($2, title),
      description = COALESCE($3, description),
      duration_minutes = COALESCE($4, duration_minutes)
    WHERE id = $1
    RETURNING *
  `;

  const values = [
    id,
    data.title || null,
    data.description || null,
    data.duration_minutes || null,
  ];

  const result = await db.query(query, values);
  return result.rows[0] || null;
},


};

module.exports = ExamRepository;
