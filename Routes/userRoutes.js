'use strict'

const api = require('express').Router()
const controller = require('../Controllers/userController')
// here is where we are going to put the middleware

api.route('/user/:id')
    .put(controller.edit)
    .get(controller.getUser)
    .delete(controller.remove)   
api.post('/user', controller.insert)
api.get('/user', controller.insert)
api.get('/users/:page', controller.getAllUsers)

module.exports = api
