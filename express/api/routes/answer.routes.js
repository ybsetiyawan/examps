const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/answer.controller');
const participantAuth = require('../middleware/participantAuth');

// peserta kirim jawaban
router.post('/', participantAuth, AnswerController.submit);

module.exports = router;
