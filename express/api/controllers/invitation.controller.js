const InvitationService = require('../services/invitation.service');

const InvitationController = {

  create: async (req, res, next) => {
    try {
      const invitation = await InvitationService.create(req.body);
      res.json({
        success: true,
        data: invitation,
      });
    } catch (err) {
      next(err);
    }
  },
  
  validate: async (req, res, next) => {
    try {
      const { token } = req.params;
      const invitation = await InvitationService.validateToken(token);
      res.json(invitation);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = InvitationController;
