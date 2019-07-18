const {Storage} = require("@google-cloud/storage")


const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

class AudioController {
  
    static upload(req, res, next) {
        console.log(req.file, "ASDASDASDASD")
        
        bucket.upload(req.file.destination + req.file.filename, {
            gzip: true
        })
        .then(result =>{
            console.log(result)
            res.status(200).json("MASUK")
        })
        .catch(next)
        // const file = bucket.file(gcsname)

        // const stream = file.createWriteStream({
        //     metadata: {
        //     contentType: req.file.mimetype
        //     }
        // })

        // stream.on('error', (err) => {
        //     req.file.cloudStorageError = err
        //     next(err)
        // })

        // stream.on('finish', () => {
        //     req.file.cloudStorageObject = gcsname
        //     file.makePublic().then(() => {
        //     req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        //     console.log(req.file.cloudStoragePublicUrl, "ASDASDASD+++++++++++++++++++")
        //     })
        // })

        // stream.end(req.file.buffer)

        
    }
}

module.exports = AudioController