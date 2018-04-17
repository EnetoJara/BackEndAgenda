'use strcit'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes')

const server = express()

server.use(bodyParser.json({ limit: '15mb' }))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cors())

server.use('/api/user', userRoutes)

module.exports = server