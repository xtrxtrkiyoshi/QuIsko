const router = require('express').Router();
const CategoryController = require('./category-controller');

/**
 * GET    /find-all
 * GET    /find-by-id
 * POST   /add
 * POST   /delete
 */

router.get('/find-all', CategoryController.findAll);
router.post('/add', CategoryController.add);
router.post('/update', CategoryController.update);
router.post('/delete', CategoryController.delete);

module.exports = router;