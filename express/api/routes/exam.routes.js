const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ExamController = require('../controllers/exam.controller');
const questionRoutes = require('./question.routes');



router.get('/', auth, ExamController.getAll);
router.get('/:id', ExamController.getById);
router.post('/', auth, ExamController.create);
router.use('/:examId/questions', questionRoutes);
router.put('/:id', ExamController.update);      // edit


module.exports = router;
