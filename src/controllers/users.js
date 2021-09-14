const { pool } = require('../service/postgres')
const bcrypt = require('bcrypt')

exports.getAllUsers = async (req, res) => {
  try {
    const query = {
      text: 'SELECT id, nama, email, npp, npp_supervisor FROM users'
    }
    const result = await pool.query(query)
    
    res.status(200).json({
      success: true,
      message: 'success get all users',
      users: result.rows
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.createUser = async (req, res) => {
  try {
    const { nama, email, npp, npp_supervisor = '-', password } = req.body

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const queryCek = {
      text: 'SELECT * FROM users WHERE email= $1 OR npp = $2',
      values: [email, npp]
    }
    const resultCek = await pool.query(queryCek)
    if(resultCek.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'email or npp already exist'
      })
    }

    const queryInsert = {
      text: 'INSERT INTO users(nama, email, npp, npp_supervisor, password) VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [nama, email, npp, npp_supervisor, hashedPassword]
    }
    const result = await pool.query(queryInsert)

    res.status(201).json({
      success: true,
      message: 'success create user',
      users: result.rows[0]
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
