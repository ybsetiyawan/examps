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
};

module.exports = EmployeeRepository;
