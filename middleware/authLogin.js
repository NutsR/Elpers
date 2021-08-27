const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectTo = req.originalUrl
        req.flash('error', 'Log in/Register')
       return res.redirect('/elpers')
    }
    next();
}

module.exports = { isLoggedIn };