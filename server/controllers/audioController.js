// const {Storage} = require("@google-cloud/storage")


// const CLOUD_BUCKET = process.env.CLOUD_BUCKET

// const storage = new Storage({
//   projectId: process.env.GCLOUD_PROJECT,
//   keyFilename: process.env.KEYFILE_PATH
// })
// const bucket = storage.bucket(CLOUD_BUCKET)

const Audio = require("../models/audio")
class AudioController {
  
    static upload(req, res, next) {
        let imageLink = req.file.cloudStoragePublicUrl
        var newAudio = new Audio({
            link: imageLink,
            userId: req.authenticatedUser.username
        })
        newAudio.save()
        .then(audio =>{
            res.status(200).json(audio)
        })
        .catch(next)
    }

    static findAll(req, res, next) {
        Audio.find()
        .then(audios =>{
            res.status(200).json(audios)
        })
        .catch(next)
    }
}

module.exports = AudioController