const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/', userController.signin)
router.post('/',userController.signup)


module.exports = router