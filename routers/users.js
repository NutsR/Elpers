const express = require('express')
const router = express.Router();
const User = require('../models/user')
const wrapAsync = require('../utils/wrapAsync');
const OnError = require('../utils/OnError');
const passport = require('passport')
const { userSchema } = require('../views/errors/validateSchema');
const { isLoggedIn } = require('../middleware/authLogin');


const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new OnError(`${msg}`, 404)
    } else {
        next();
    }
 }

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', wrapAsync(async(req, res) => {
    try{
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registered = await User.register(user, password);
    req.login(registered, err => {
        if(err) next(err)
        req.flash('success', 'Welcome to Elpers Camp be Sure to Elp everyone So you can get elp aswell')
        req.session.loggedIn = true;
        res.redirect('/elpers')
    } )
    } catch(err){
        const errorMsg = err.name.replace('Error', '')
         req.flash('error',  `${errorMsg}, ${err.message}`);
         return res.redirect('/u/register')
    }
}));

router.post('/login', passport.authenticate('local', {failureFlash: true}),wrapAsync(async(req, res) => {
    req.flash('success' , 'Elp Camp needs your elp once again')
    const redirectUrl = req.session.redirectTo || '/elpers'
    req.session.loggedIn = true;
    delete req.session.redirectTo
    res.redirect(redirectUrl);
}))

router.get('/logout', (req, res) => {
    if(req.user){
        req.logout()
        req.flash('success', 'logged Out :C')
        req.session.loggedIn = null;
        return res.redirect('/elpers')
    }
    req.flash('error', 'Not logged In')
    res.redirect('/elpers')
})

module.exports = router;