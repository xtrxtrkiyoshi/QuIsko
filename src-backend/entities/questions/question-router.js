const router = require('express').Router();
const QuestionController = require('./question-controller');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all', QuestionController.findAll);
router.post('/add', QuestionController.add);
router.get('/randomize/:category1/:category2/:category3/:numberOfQuestions', QuestionController.randomize);
router.post('/update', QuestionController.update);
router.post('/delete', QuestionController.delete);

module.exports = router;