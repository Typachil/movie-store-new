const {Router} = require('express');
const ratingContoller = require('../controllers/ratingController');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ratingContoller.ratingFilm);
router.get('/', authMiddleware, ratingContoller.getRatingUser)

module.exports = router;