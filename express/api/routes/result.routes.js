const express = require('express');
const router = express.Router();
const ResultController = require('../controllers/result.cotroller');

router.get('/attempt/:attemptId', ResultController.getByAttempt);

module.exports = router;
