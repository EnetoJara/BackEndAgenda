'use strict'

const api = require('./server')
const http = require('http')
const mongoose = require('mongoose')

const server = http.createServer(api)
const port = 3000

mongoose.connect('mongodb://localhost:27017/Agenda')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'ERROR YnY'))
db.on('open', function () {
    server.listen(port, err => {
        if (err) console.log(err)
        else console.log('SERVER RUNNING n.n')
    })
})