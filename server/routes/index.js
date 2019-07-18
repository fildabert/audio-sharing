const router = require('express').Router()
const userRouter = require('../routes/user')
const audioRouter = require('../routes/audio')

router.use('/users', userRouter)
router.use('/audio', audioRouter)

module.exports = router