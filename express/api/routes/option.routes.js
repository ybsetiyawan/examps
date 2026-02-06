const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const OptionController = require('../controllers/option.controller');

router.post('/', auth, OptionController.create);

module.exports = router;
