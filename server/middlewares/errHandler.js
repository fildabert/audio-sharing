function errHandler(err, req, res, next) {
  let status = null
  let message = {}

  console.log(err,'ini err yang masuk handler');
  if (err.code === 404) {
      status = 404
      message.err = 'Data Not Found'
  }
  else if (err.name =='ValidationError') {
    status = 400
    message.err = err.message.split('failed: ')[1]
  }
  else if (typeof err == "string") {
    status = 400
    message.err = err
  }
  else if (err.name == "MongoError") {
    status = 400
    message.err = 'tidak bisa memasukkan fox yang sama'
  }
  else{
      status = 500
      message.err = `Internal server error`
  }
  res.status(status).json(message)
}

module.exports = errHandler