const router = require('express').Router()
const audioController = require ('../controllers/audioController')
const images = require("../helpers/images")



router.post('/upload', 

    images.multer.single('audio'), 

    images.sendUploadToGCS,

    (req,res,next)=>{

        let imageLink = req.file.cloudStoragePublicUrl

        res.status(200).json(imageLink)

    }

)

module.exports = router