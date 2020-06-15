const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
require('dotenv').config()

class UserController {

    static showAll(req,res, next){
        User.findAll()
        .then(function(users){
            res.status(201).json(users)
        })
        .catch ((err) =>{
            next(err)
            // res.status(500).json({
            //     message: "Gagal memuat User"
            // })
        })
    }


    static register(req,res, next){
        User.findOne({where: {username: req.body.username}})
        .then((data)=>{
            if( !data ){
                let newUser = {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                }
                User.create(newUser)
                .then((user)=>{
                    res.status(201).json(user)
                })
                .catch ((err) =>{
                    res.status(400).json({
                        message: "Gagal membuat User"
                    })
                })
            } else {
                res.status(500).json({
                    message: "Username sudah ada"
                })
            }
        })
    }

    static login(req,res, next){
        // console.log(req.method, req.url, req.body)
        User.findOne({where: {username: req.body.username}})
        .then((user)=>{
            if( user && bcrypt.compareSync(req.body.password, user.password) ){
                const access_token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, 'admin' )
                res.status(200).json({token: access_token})
            } else {
                res.status(400).json("Username or password salah")
            }
        })
        .catch ((err) =>{
            res.status(500).json({
                message: "Gagal Login"
            })
        })
    }

    static googleSign(req,res,next){
        // console.log("google sign in server")
        let {id_token} = req.body
        let email = null
        // console.log(id_token + "ID TOKENN SERVER")
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then((ticket) =>{
            email = ticket.getPayload().email
            return User.findOne({
                where: {
                    email: email
                }
            })
        })
        .then((data) =>{
            if( data ){
                return {
                    id: data.id,
                    email: data.email
                }
            } else {
                return User.create({
                    email: email,
                    password: 'admin',
                    username: email
                })
            }
        })
        .then((data)=>{
            let payload = {
                id: data.id,
                email: data.email
            }
            return res.status(200).json({
                data: {
                    email: data.email,
                    id: data.id,
                    access_token: jwt.sign(payload, 'admin' )
                }
            })
        })
        .catch ((err) =>{
            next(err)
        })
    }


}

module.exports = UserController