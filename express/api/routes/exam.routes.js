const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ExamController = require('../controllers/exam.controller');
const questionRoutes = require('./question.routes');



router.post('/', auth, ExamController.create);
router.use('/:examId/questions', questionRoutes);

module.exports = router;
