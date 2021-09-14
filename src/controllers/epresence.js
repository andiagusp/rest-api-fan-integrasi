const { pool } = require('../service/postgres')
const moment = require('moment')

exports.absent = async (req, res) => {
  try {
    const { id: id_users } = req.accessToken
    const { type, waktu = moment().format('D-M-YYYY, HH:mm:ss') } = req.body

    const query = {
      text: 'INSERT INTO epresence(id_users, type, waktu) VALUES($1, $2, $3)',
      values: [id_users, type, waktu]
    }
    const result = await pool.query(query)

    res.status(201).json({
      success: true,
      message: 'absent success'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.getAllAbsent = async (req, res) => {
  try {
    const { type, date } = req.body
    const query = {
      text: `
        SELECT id_users, nama as nama_user, type, is_approve, waktu
        FROM epresence
        LEFT JOIN users
        ON epresence.id_users = users.id
      `,
    }
    const result = await pool.query(query)
    let mergeResult = []

    for (let i = 0; i < result.rows.length; i++) {
      if (result.rows[i].hasOwnProperty('id_users') ) {
        for (let j = i + 1; j < result.rows.length; j++) {
          if (result.rows[j].hasOwnProperty('id_users')) {
            if (result.rows[i].id_users === result.rows[j].id_users && result.rows[i].waktu.split(',')[0] === result.rows[j].waktu.split(',')[0]) {
              const data = {
                id_user: result.rows[i].id_users,
                nama_user: result.rows[i].nama_user,
                tanggal: result.rows[i].waktu.split(',')[0],
                waktu_masuk: result.rows[j].waktu.split(',')[1].replace(' ', ''),
                waktu_pulang: result.rows[i].waktu.split(',')[1].replace(' ', ''),
                status_masuk: cekMasuk(result.rows[j].is_approve),
                status_pulang: cekMasuk(result.rows[i].is_approve)
              }
              mergeResult = [...mergeResult, data]
              result.rows[i] = {}
              result.rows[j] = {}
            }
          }
        }
      }
    }
    
    const mapJustIn = result.rows
      .filter((r) => r.hasOwnProperty('id_users'))
      .map((r) => {
        if (r.type === "IN") {
          return {
            id_user: r.id_users,
            nama_user: r.nama_user,
            tanggal: r.waktu.split(',')[0],
            waktu_masuk: r.waktu.split(',')[1].replace(' ', ''),
            waktu_pulang: '-',
            status_masuk: cekMasuk(r.is_approve),
            status_pulang: '-'
          }
        }
      })

    const responseResult = [ ...mergeResult, ...mapJustIn]
    res.status(200).json({
      success: true,
      message: 'success get absen data',
      data: responseResult
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.updateAbsentBySpv = async (req, res) => {
  try {
    const { id } = req.params
    const { npp } = req.accessToken
    const { is_approve } = req.body
    console.log(is_approve)
    
    const queryCek = {
      text: `
        SELECT epresence.id, id_users, nama as nama_user, type, is_approve, waktu, npp_supervisor
        FROM epresence
        LEFT JOIN users
        ON epresence.id_users = users.id
        WHERE epresence.id = $1
      `,
      values: [id]
    }
    const resultCek = await pool.query(queryCek)

    if (resultCek.rows[0].npp_supervisor !== npp) {
      return res.status(400).json({
        success: false,
        message: `failed you not supervisor ${resultCek.rows[0].name}`
      })
    }

    const queryUpdate = {
      text: `UPDATE epresence SET is_approve=$1 WHERE id=$2 RETURNING id, id_users`,
      values: [is_approve, id]
    }

    const resultUpdate = await pool.query(queryUpdate)
    res.status(200).json({
      success: true,
      message: `success update status absent user ${resultUpdate.rows[0].id_users}`,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const cekMasuk = (is_approve) => {
  switch (is_approve) {
    case true:
      return 'APPROVE'
    case false:
      return 'REJECT'
    default:
      return 'PENDING'
  }
}
