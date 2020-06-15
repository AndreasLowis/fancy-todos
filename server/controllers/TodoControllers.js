const {Todo} = require('../models')

class TodoControllers {

    static addTodo(req, res, next){
        // console.log(req)
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: "uncomplete",
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(obj)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            next(err)
            // res.status(500).json(err)
        })
    }

    static showAll(req, res, next){
        Todo.findAll({where: {UserId: req.userData.id}})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

    static showOne(req, res, next){
        Todo.findOne({where: {id: req.params.id}})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

    static editAll(req, res, next){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(obj, {where: {id:req.params.id}})
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    }


    static destroy(req, res, next){
        Todo.destroy({where: {id: req.params.id}})
        .then((data)=>{
            res.status(200).json({message: "todos has beed deleted"})
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

}


module.exports = TodoControllers