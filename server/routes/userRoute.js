const route = require('express').Router()
const UserControllers = require('../controllers/UserControllers')

route.get('/', UserControllers.showAll)

route.post('/register', UserControllers.register)

route.post('/login', UserControllers.login)

route.post('/googleSign', UserControllers.googleSign)

module.exports = route