let LocalStrategy = require('passport-local').Strategy
let User = require('../models/user.js')

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id)
    })
    
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({ 'local.email': email}, function(err, user){
                if (err) return done(err)
                if (user) {
                    return done(null, false, console.log('already exists'))
                } else {
                    var newUser = new User()
                    newUser.local.email = email
                    newUser.local.password = newUser.generateHash(password)
                }
                newUser.save(function(err){
                    if(err) throw err
                    return done(null, newUser)
                })
            })
        })
    }))
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({ 'local.email': email}, function(err, user){
            if(err) return done(err)
            if(!user)
                return done(null, false, console.log('wrong email: ' + email))
            if(!user.validPassword(password))
                return done(null, false, console.log('wrong password with: ' + email))
            return done(null, user)
        })
    }))
}