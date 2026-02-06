const express = require('express');
const router = express.Router();
const QuestionParticipantController = require('../controllers/questionParticipant.controller');

// peserta ambil soal ujian
router.get('/:token/questions', QuestionParticipantController.getQuestions);

module.exports = router;
