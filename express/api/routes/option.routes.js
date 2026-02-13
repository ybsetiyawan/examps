const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const OptionController = require('../controllers/option.controller');

router.post('/', auth, OptionController.create);
router.get('/', OptionController.getByQuestion);


module.exports = router;
