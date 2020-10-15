const { Router } = require('express');
//-----------Routers Import------------------------------
const userRouter = require('./user');

//--------------------------------------------------------

const router = Router();
router.use('/users', userRouter)
module.exports = router