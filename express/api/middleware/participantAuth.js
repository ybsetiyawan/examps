const InvitationService = require('../services/invitation.service');

module.exports = async function participantAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token peserta diperlukan'
      });
    }

    const token = authHeader.split(' ')[1];

    // validasi token undangan
    const invitation = await InvitationService.validateToken(token);

    // simpan di request supaya bisa dipakai controller/service
    req.invitation = invitation;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message
    });
  }
};
