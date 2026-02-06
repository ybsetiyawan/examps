const db = require('../config/db');

class AdminRepo {
  static async create(data) {
    const query = `
      INSERT INTO admins (id, name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email
    `;
    const values = [
      data.id,
      data.name,
      data.email,
      data.password_hash
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getByEmail(email) {
    const { rows } = await db.query(
      'SELECT * FROM admins WHERE email = $1',
      [email]
    );
    return rows[0];
  }
}

module.exports = AdminRepo;
