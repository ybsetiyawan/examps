const express = require('express');
const router = express.Router();
const ExamAttemptController = require('../controllers/examAttempt.controller');


// peserta mulai ujian via token
router.post('/start/:token', ExamAttemptController.start);
router.post('/finish', ExamAttemptController.finish);


module.exports = router;
