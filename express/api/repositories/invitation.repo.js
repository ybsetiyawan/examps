const db = require('../config/db');

const InvitationRepository = {
  findByToken: async (token) => {
    const query = `
      SELECT *
      FROM invitations
      WHERE token = $1
      LIMIT 1
    `;
    const result = await db.query(query, [token]);
    return result.rows[0] || null;
  },

  create: async (invitation) => {
    const query = `
      INSERT INTO invitations (
        id, exam_id, employee_id, email,
        token, status, expired_at
      )
      VALUES ($1, $2, $3, $4, $5, 'sent', $6)
      RETURNING *
    `;

    const values = [
      invitation.id,
      invitation.exam_id,
      invitation.employee_id,
      invitation.email,
      invitation.token,
      invitation.expired_at || null,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  updateStatus: async (id, status) => {
    const query = `
      UPDATE invitations
      SET status = $2
      WHERE id = $1
      RETURNING *
    `;
    const result = await db.query(query, [id, status]);
    return result.rows[0];
  },
};

module.exports = InvitationRepository;
