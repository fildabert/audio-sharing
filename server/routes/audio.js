const router = require('express').Router()
const audioController = require ('../controllers/audioController')

router.post('/',audioController.create)

module.exports = router