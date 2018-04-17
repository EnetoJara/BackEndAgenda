'use strict'

const mongoosePagination = require('mongoose-pagination')
const User = require('../Models/userModel')

function insert (req, res) {
    let user = new User()
    if (!req.body.name || !req.body.lastName || !req.body.phone) 
        return res.status(406).send({ message: 'There is some missing information' })
    
    user.name = req.body.name
    user.lastName = req.body.lastName
    user.phone = req.body.phone
    user.email = req.body.email
    user.address = req.body.address
    user.job = req.body.job

    user.save((err, newUser) => {
        if (err) return res.status(500).send({ message: 'ERROR inserting new User' })
        else return res.status(200).json(newUser)
    })
}

function remove (req, res) {
    User.findByIdAndRemove(req.params.id, err => {
        if (err) return res.status(500).send({ message: 'ERROR Removing' })
        else return res.status(200).send({ message: 'Removed: ' + req.params.id })
    })
}

function edit (req, res) {
    const user = {}
    if (!req.body.name || !req.body.lastName || !req.body.phone) return res.status(406).send({ message: 'There is some missing information' })
    User.findOne({ _id: req.params.id }, (err, stored) => {
        if (err) return res.status(500).send({ message: 'ERROR Getting User' })
        else if (!stored.id) return res.status(404).send({ message: 'There is no such a user' })
        user.name = (req.body.name) ? req.body.name : stored.name
        user.lastName = (req.body.lastName) ? req.body.lastName : stored.lastName
        user.phone = (req.body.phone) ? req.body.phone : stored.phone
        user.email = (req.body.email) ? req.body.email : stored.email
        user.address = (req.body.address) ? req.body.address : stored.address
        user.job = (req.body.job) ? req.body.job : stored.job
        User.findByIdAndUpdate(req.params.id, user, { new: true }, (err, updated) => {
            if (err) return res.status(500).send({ message: 'ERROR Updating' })
            else if (!updated) return res.status(404).send({ message: 'ERROR' })
            else return res.status(200).json(updated)
        })
    })
}

function getAllUsers (req, res) {
    const page = (req.params.page && !isNaN(req.params.page)) ? req.params.page : 1
    const contatsPerPage = 20
    User.find({}).skip((page-1) * contatsPerPage).limit(contatsPerPage)
    .exec((err, result) => {
        if (err) return res.status(500).send({ message: 'ERROR GETING USERS' })
        else return res.status(200).json(result)
    })
}

function getUser (req, res) {
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) return res.status(500).send({ message: 'ERROR Getting user' })
        else if (!user) return res.status(404).send({ message: 'User not found' })
        else return res.status(200).json(user)
    })
}

module.exports = { insert, remove, edit, getUser, getAllUsers }