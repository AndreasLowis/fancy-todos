const jwt = require('jsonwebtoken')
const {User, Todo} = require('../models')


const authentication = (req,res,next)=>{
    // console.log(req.headers)
    const {access_token} = req.headers
    // console.log(access_token + "autentication auth.js")
    if(!access_token ){
        // res.status(404).json({message: "Token not found"})
        next({name: 'TOKEN_ERROR'})
    } else {
        // console.log("token auth.js")
        let decode = jwt.verify(access_token, 'admin')
        // console.log(JSON.stringify(decode) + "decode auth.js")
        req.userData = decode
        User.findByPk(req.userData.id)
        .then((data)=>{
            if( data ){
                next()
            } else {
                next({name: 'USER_NOT_FOUND'})
                // res.status(404).json({message: "invalid user"})
            }
        })
        .catch((err)=>{
            next(err)
            // res.status(401).json({message: err.message})
        })
    }
}

const authorization = (req,res,next)=>{
    const id = req.params.id
    // console.log(id + "asdasdasdsa")
    Todo.findByPk(id)
    .then((data)=>{
        if( !data ){
            next({name: 'Todo not found'})
            // res.status(404).json({message: 'Todo not found'})
        } else if (data.UserId !== req.userData.id) {
            next({name: 'ure not authorized'})
            // res.status(403).json({message: 'ure not authorized'})
        } else {
            next()
        }
    })
    .catch((err)=>{
        next(err)
        // res.status(500).json({message: "internal server error"})
    })
}

module.exports = {authentication, authorization}