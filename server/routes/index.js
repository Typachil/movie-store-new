const {Router} = require('express');
const router = Router();
const filmRouter = require('./filmRouter');
const categoryRouter = require('./categoryRoute');
const userRouter = require('./userRouter');

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/film', filmRouter)

module.exports = router;