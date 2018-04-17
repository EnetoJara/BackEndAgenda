'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: String,
    job: String,
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)