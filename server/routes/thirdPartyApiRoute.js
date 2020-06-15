const route = require('express').Router()
const thirdPartyController = require('../controllers/thirdPartyController')

route.get('/movies', thirdPartyController.getMovies)

module.exports = route