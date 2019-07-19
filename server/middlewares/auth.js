const User = require('../models/user');
const { verify } = require('../helpers/jwtoken')

module.exports = {
    authentication: function (req, res, next) {
        try {
            const token = req.headers.accesstoken
            if (token) {
                const decoded = verify(req.headers.accesstoken)
                req.authenticatedUser = decoded

                if (process.env.NODE_ENV === 'test') {
                    next();
                } else {
                    User.findById(req.authenticatedUser._id)
                        .then(user => {
                            if (user) {
                                next();
                            } else {
                                res.status(401).json({message: 'Token is not valid'})
                            }
                        })
                        .catch(err => {
                            res.status(500).json({message: err.message})
                        })
                }
            } else {
                res.status(401).json({message: 'Please login to continue'})
            }
        } catch (err) {
            res.status(401).json({message: 'Please login to continue'})
        }
    }
}