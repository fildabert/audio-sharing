const router = require('express').Router()
const audioController = require ('../controllers/audioController')
const images = require("../helpers/images")
const authenticate = require("../middlewares/authenticate")

router.get("/all", audioController.findAll)

router.post('/upload', authenticate, 

    images.multer.single('audio'), 

    images.sendUploadToGCS,
    audioController.upload

)

module.exports = router