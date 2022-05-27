const {Router} = require('express');
const userController = require('../controllers/userController');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

router.post('/registration', 
    check('name')
    .isLength({min: 1})
    .withMessage('Введите никнейм'), 
    check('password').
    isLength({ min: 5, max: 20 })
    .withMessage('Пароль должен содержать минимум 5 символов'), 
    check('email').isEmail()
    .withMessage('Введите корректный email'),
    userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check)

module.exports = router;