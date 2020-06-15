const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')
const thirdPartyApiRoute = require('./thirdPartyApiRoute') 

route.get('/', function (req, res) {
    res.send({status_code: 200, message: 'Hello World!!'})
})

route.use('/users', userRoute)

route.use('/todos', todoRoute)

route.use('/third-apis', thirdPartyApiRoute)

module.exports = route