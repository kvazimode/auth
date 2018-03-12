const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser =require('body-parser')

const params = require('./config/params.js')

mongoose.connect(params.DBurl, console.log('>>>connected'))

app.use(cookieParser())
app.use(bodyParser())
app.set('view engine', 'pug')

app.use(session({secret: 'nonono' }))
app.use(passport.initialize())
app.use(passport.session())

require('./routes.js')(app, passport)
require('./config/passport')(passport)

app.listen(port)

console.log('>>>up and runnig on ' + port)