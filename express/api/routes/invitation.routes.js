// const express = require('express');
// const router = express.Router();
// const InvitationController = require('../controllers/invitation.controller');

// router.get('/:token', InvitationController.validate);

// module.exports = router;


const express = require('express');
const router = express.Router();
const InvitationController = require('../controllers/invitation.controller');
const auth = require('../middleware/auth');

router.post('/', auth, InvitationController.create); // admin
router.get('/:token', InvitationController.validate); // peserta

module.exports = router;
