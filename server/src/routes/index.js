const { Router } = require('express');
//-----------Routers Import------------------------------
const userRouter = require('./user');
const catRouter = require('./categoria')

//--------------------------------------------------------

const router = Router();
router.use('/user', userRouter)
router.use('/categoria', catRouter)
module.exports = router