const router = require('express').Router()
const audioController = require ('../controllers/audioController')
const images = require("../helpers/images")
const { authenticate } = require('../middlewares/authenticate')

router.get("/all", audioController.findAll)

router.post('/upload', 

    images.multer.single('audio'), 

    images.sendUploadToGCS,
    audioController.upload

)
router.get('/byId', authenticate, audioController.findById)

module.exports = router