const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../service/postgres')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    }
    const result = await pool.query(query)

    if (!result.rows) {
      return res.status(401).json({
        success: false,
        message: 'email or password wrong'
      }) 
    }
    const data = {
      id: result.rows[0].id,
      npp: result.rows[0].npp,
      npp_supervisor: result.rows[0].npp_supervisor
    }
    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign(data, secretKey)

    res.status(200).json({
      success: true,
      message: 'success login',
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
