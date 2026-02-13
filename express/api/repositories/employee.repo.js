const db = require('../config/db');

const EmployeeRepository = {
  findByNik: async (nik) => {
    const query = `
      SELECT *
      FROM employees
      WHERE nik = $1
        AND is_active = true
      LIMIT 1
    `;
    const result = await db.query(query, [nik]);
    return result.rows[0] || null;
  },

  findById: async (id) => {
    const query = `
      SELECT *
      FROM employees
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  },

 findAllPaginatedSearch: async (page = 1, limit = 10, search = '') => {
  const offset = (page - 1) * limit;
  const searchTerm = `%${search}%`;

  const dataQuery = `
    SELECT *
    FROM employees
    WHERE is_active = true
      AND (
        nik ILIKE $3
        OR name ILIKE $3
      )
    ORDER BY nik ASC
    LIMIT $1 OFFSET $2
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM employees
    WHERE is_active = true
      AND (
        nik ILIKE $1
        OR name ILIKE $1
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



  findAll: async () => {
    const query = `
      SELECT *
      FROM employees
      WHERE is_active = true
      ORDER BY nik ASC
    `;
    const result = await db.query(query);
    return result.rows || [];
  },

  create: async (employee) => {
    const query = `
      INSERT INTO employees (
        id, nik, name, spcd, spname, email
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      employee.id,
      employee.nik,
      employee.name,
      employee.spcd,
      employee.spname,
      employee.email || null,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  update: async (id, data) => {
  const query = `
    UPDATE employees
    SET 
      nik = COALESCE($2, nik),
      name = COALESCE($3, name),
      spcd = COALESCE($4, spcd),
      spname = COALESCE($5, spname),
      email = COALESCE($6, email)
    WHERE id = $1
      AND is_active = true
    RETURNING *
  `;

  const values = [
    id,
    data.nik || null,
    data.name || null,
    data.spcd || null,
    data.spname || null,
    data.email || null,
  ];

  const result = await db.query(query, values);
  return result.rows[0] || null;
},

softDelete: async (id) => {
  const query = `
    UPDATE employees
    SET is_active = false
    WHERE id = $1
    RETURNING *
  `;

  const result = await db.query(query, [id]);
  return result.rows[0] || null;
},


  
};

module.exports = EmployeeRepository;
