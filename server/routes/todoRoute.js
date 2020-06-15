const route = require('express').Router()
const TodoControllers = require('../controllers/TodoControllers')
const  {authentication, authorization} = require('../middleware/auth')


route.use(authentication)

route.post('/', TodoControllers.addTodo)

route.get('/', TodoControllers.showAll)

// route.use(authorization)

route.get('/:id', TodoControllers.showOne)

route.put('/:id', TodoControllers.editAll)

// route.patch('/:id', TodoControllers.editSection)

route.delete('/:id', authorization, TodoControllers.destroy)

module.exports = route