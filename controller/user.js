const User = require('../models/user')
const renderRegister = (req, res) => {
    res.render('users/register')
}

const registerUser = async(req, res) => {
    try{
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registered = await User.register(user, password);
    req.login(registered, err => {
        if(err) next(err)
        req.flash('success', 'Welcome to Elpers Camp be Sure to Elp everyone So you can get elp aswell')
        req.session.loggedIn = req.user._id;
        res.redirect('/elpers')
    } )
    } catch(err){
        const errorMsg = err.name.replace('Error', '')
         req.flash('error',  `${errorMsg}, ${err.message}`);
         return res.redirect('/u/register')
    }
}

const loginUser = async(req, res) => {
    req.flash('success' , 'Elp Camp needs your elp once again')
    const redirectUrl = req.session.redirectTo || '/elpers' 
    req.session.loggedIn = req.user._id;
    delete req.session.redirectTo
    res.redirect(redirectUrl);
}

const logoutUser = (req, res) => {
    if(req.user){
        req.logout()
        req.flash('success', 'logged Out :C')
        req.session.loggedIn = null;
        return res.redirect('/elpers')
    }
    req.flash('error', 'Not logged In')
    res.redirect('/elpers')
}

module.exports = { renderRegister, registerUser, loginUser, logoutUser }