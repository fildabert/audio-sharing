const router = require('express').Router()
const audioController = require ('../controllers/audioController')
const images = require("../helpers/images")

router.get("/all", audioController.findAll)

router.post('/upload', 

    images.multer.single('audio'), 

    images.sendUploadToGCS,
    audioController.upload

)

module.exports = router