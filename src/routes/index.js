const express = require('express')
const router = express.Router()

const authenticationToken = require('../middleware/authentication')
const authorizationSupervisor = require('../middleware/authorization')

const { getAllAbsent, absent, updateAbsentBySpv } = require('../controllers/epresence')
const { getAllUsers, createUser } = require('../controllers/users')
const { login } = require('../controllers/login')

router.post('/user/register', createUser)
router.get('/users', authenticationToken, getAllUsers)

router.post('/login', login)

router.get('/epresences', authenticationToken, getAllAbsent)
router.post('/epresence', authenticationToken, absent)
router.patch('/epresence/:id', authenticationToken, authorizationSupervisor, updateAbsentBySpv)

module.exports = router
