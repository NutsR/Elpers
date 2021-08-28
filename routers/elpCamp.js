const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { elperSchema } = require('../views/errors/validateSchema');
const { isLoggedIn } = require('../middleware/authLogin')
const Elper = require('../models/elper.js');
const isAuthor = require('../middleware/authOwner');

const validateElpers = (req, res, next) => {
    const { error } = elperSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new OnError(`${msg}`, 404)
    } else {
        next();
    }
 }

// Routes for /Elpers

router.get('/', wrapAsync(async (req, res) => {
const elpers = await Elper.find({});
res.render('elpers/index', { elpers });   
}));


router.get('/create', isLoggedIn, (req,res) => {
    res.render('elpers/create');
});


router.get('/:id', wrapAsync(async (req, res, next) => {
   const { id } = req.params;
    const elper = await Elper.findById( id )
	.populate({
	path: 'review',
	populate: {path:'user'}
	})
	.populate('user');
    if(!elper){
        req.flash('error', 'page requested not found')
       return res.redirect(`/elpers`);
    }
    res.render('elpers/details', { elper });
}));


router.get('/:id/modify', isAuthor,wrapAsync(async (req,res) => {
        const { id } = req.params;
         const elper = await Elper.findById( id );
         if(!elper){
            req.flash('error', 'page requested not found')
            return res.redirect('/elpers');
        }
         res.render('elpers/modify', { elper });
}));


router.post('/', isLoggedIn, validateElpers ,wrapAsync(async (req,res) => {
    const elpCamp = new Elper(req.body)
   elpCamp.user = req.user._id
    await elpCamp.save()
    req.flash('success', 'ElpCamp succesfully created')
    res.redirect(`/elpers/${elpCamp._id}`);
}));

router.put('/:id', isLoggedIn, isAuthor, validateElpers ,wrapAsync(async (req, res) => {
    const { id } = req.params;
const elperModified = await Elper.findByIdAndUpdate(id,req.body);
    req.flash('success', 'ElpCamp successfully modified')
    res.redirect(`/elpers/${elperModified._id}`);
}));


router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params;
   await Elper.findByIdAndDelete(id);
    res.redirect(`/elpers`);
}));

module.exports = router;
