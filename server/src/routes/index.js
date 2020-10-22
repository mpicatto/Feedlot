const { Router } = require('express');
//-----------Routers Import------------------------------
const userRouter = require('./user');
const catRouter = require('./categoria')
const RouterEstablecimiento = require('./establecimiento')
const rodeoRouter = require('./rodeo')


//--------------------------------------------------------

const router = Router();
router.use('/user', userRouter)
router.use('/categoria', catRouter)
router.use('/establecimiento', RouterEstablecimiento)
router.use('/rodeo', rodeoRouter)
module.exports = router