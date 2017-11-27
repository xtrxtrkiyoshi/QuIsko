const router = require('express').Router();
const QuestionController = require('./difficulty-controller');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all', QuestionController.findAll);
router.post('/add', QuestionController.add);
router.post('/update', QuestionController.update);
router.post('/delete', QuestionController.delete);

module.exports = router;