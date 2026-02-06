const db = require('../config/db');

const OptionRepo = {
  create: async (data) => {
    const query = `
      INSERT INTO options (
        id, question_id, label, text, is_correct
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      data.id,
      data.question_id,
      data.label,
      data.text,
      data.is_correct
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  }
};

module.exports = OptionRepo;
