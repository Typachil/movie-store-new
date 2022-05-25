const {Router} = require('express');
const historyContoller = require('../controllers/historyController');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, historyContoller.setHistoryFilm);
router.get('/', authMiddleware, historyContoller.getHistoryUser);

module.exports = router;