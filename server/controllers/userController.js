const { userModel } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwtoken')

class UserController {
  static signup(req, res, next) {
    let { username, email, password } = req.body
    let newUser = { username, email, password }
    userModel
      .create(newUser)
      .then((newUser) => {
        res.status(201).json(newUser)
      })
      .catch(next)
  }

  static signin(req, res, next) {
    let { username, password } = req.body
    userModel
      .findOne({
        username: username
      })
      .then((found) => {
        if (found) {
          if (compare(password, found.password)) {
            let payload = {
              _id: found._id,
              username: found.username,
              email: found.email
            }
            let token = sign(payload)
            res.status(200).json({ token })
          }
          else {
            throw `Invalid username / password`
          }
        }
        else {
          console.log('masuk salah');
          throw `Invalid username / password`
        }
      })
      .catch(next)
  }

}

module.exports = UserController