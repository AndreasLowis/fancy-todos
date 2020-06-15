const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
require('dotenv').config()


// app.set("view engine", "ejs")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, function(){
    console.log(`${PORT}`)
})