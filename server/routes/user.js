const router = require('express').Router()
const userController = require('../controllers/userController')

<<<<<<< HEAD
router.post('/signup', userController.signup)
router.post('/signin',userController.signin)
=======
router.post('/', userController.signin)
router.post('/',userController.signup)
>>>>>>> 3281874acc842331bacd6736832b63a17f2ef003


module.exports = router