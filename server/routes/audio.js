const router = require('express').Router()
const audioController = require ('../controllers/audioController')
const images = require("../helpers/images")

<<<<<<< HEAD
router.post('/',audioController.create)
=======
router.get("/all", audioController.findAll)

router.post('/upload', 

    images.multer.single('audio'), 

    images.sendUploadToGCS,
    audioController.upload

)
>>>>>>> 3281874acc842331bacd6736832b63a17f2ef003

module.exports = router