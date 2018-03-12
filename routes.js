module.exports = function(app, passport) {
    //homepage
    app.get('/', function(req, res) {
        res.render('start')
    })
    
    //loginpage
    app.get('/login', function(req, res) {
        res.render('login')
    })
    
    //loginpost
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }))
    
    //signuppage
    app.get('/signup', function(req, res) {
        res.render('signup')
    })
    
    //signuppost
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }))
    
    //profile
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user
        })
    })
    
    //logout
    app.get('/logout', function(req, res) {
        req.logout()
        req.redirect('/')
    })
}

function isLoggedIn(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/')
}