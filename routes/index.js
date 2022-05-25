const {Router} = require('express');
const router = Router();
const filmRouter = require('./filmRouter');
const categoryRouter = require('./categoryRoute');
const userRouter = require('./userRouter');
const ratingRouter = require('./ratingRoute');
const historyRouter = require('./historyRoute')

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/film', filmRouter);
router.use('/rating', ratingRouter);
router.use('/history', historyRouter);

module.exports = router;