const {Router} = require('express');
const router = Router();
const filmController = require('../controllers/filmController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', checkRole('ADMIN'), filmController.create);
router.get('/', filmController.getAll);
router.get('/:id', filmController.getOne);

module.exports = router;