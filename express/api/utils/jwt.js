const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_jangan_pakai_production';
const JWT_EXPIRES_IN = '1d';

module.exports = {
  sign(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
  },

  verify(token) {
    return jwt.verify(token, JWT_SECRET);
  }
};
