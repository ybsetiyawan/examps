const express = require('express');
const router = express.Router();
const ExamAttemptController = require('../controllers/examAttempt.controller');
const participantAuth = require('../middleware/participantAuth');


// peserta mulai ujian via token
router.post('/start/:token', ExamAttemptController.start);
router.post('/finish', participantAuth, ExamAttemptController.finish);


module.exports = router;
