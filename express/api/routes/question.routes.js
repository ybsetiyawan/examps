const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const QuestionController = require('../controllers/question.controller');
const optionRoutes = require('./option.routes');

router.post('/', auth, QuestionController.create);
router.get('/', auth, QuestionController.getByExam);
router.get('/:questionId',  QuestionController.getById);
router.put('/:questionId', auth, QuestionController.update);
router.delete('/:questionId',  auth, QuestionController.delete);

router.use('/:questionId/options', optionRoutes);

module.exports = router;
