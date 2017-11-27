const router = require('express').Router();
const HighScoreController = require('./highscore-controller');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all', HighScoreController.findAll);
router.post('/add', HighScoreController.add);

module.exports = router;