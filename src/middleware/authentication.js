const jwt = require('jsonwebtoken')

const authenticationToken = async (req, res, next) => {
  try {
    const header = req.header('Authorization')
    if (!header) {
      return res.status(401).json({
        success: false,
        message: 'unauthorized'
      })
    }
    const token = header.substring('Bearer '.length)
    const verify = jwt.verify(token, process.env.SECRET_KEY)
    req.accessToken = verify
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = authenticationToken
