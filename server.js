require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

const router  = require('./src/routes')

app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
