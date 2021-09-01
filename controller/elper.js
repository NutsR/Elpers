const Elper = require('../models/elper.js')
const elpHome = async (req, res) => {
const elpers = await Elper.find({});
res.render('elpers/index', { elpers });   
}

const renderCreate = (req,res) => {
    res.render('elpers/create');
}

const renderDetails = async (req, res, next) => {
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
}

const renderEdit = async (req,res) => {
        const { id } = req.params;
         const elper = await Elper.findById( id );
         if(!elper){
            req.flash('error', 'page requested not found')
            return res.redirect('/elpers');
        }
         res.render('elpers/modify', { elper });
}

const createElpCamp = async (req,res) => {
    const elpCamp = new Elper(req.body)
    elpCamp.images = req.files.map(f => ({url: f.path, filename: f.filename}) )
    elpCamp.user = req.user._id
    await elpCamp.save()
    req.flash('success', 'ElpCamp succesfully created')
    res.redirect(`/elpers/${elpCamp._id}`);
}

const editElpCamp = async (req, res) => {
    const { id } = req.params;
    if(!req.files){
const elperModified = await Elper.findByIdAndUpdate(id, req.body);
    req.flash('success', 'ElpCamp successfully modified')
   return res.redirect(`/elpers/${elperModified._id}`);
    }
    const elper = await Elper.findById(id); 
    const imageUpload = req.files.map(f => ({url: f.path, filename: f.filename}))
    elper.images.push(...imageUpload);
    await elper.save();
    res.redirect(`/elpers/${id}`)
}

const renderImageUpload = async(req, res) => {
				const { id } = req.params;
				const elper = await Elper.findById(id);
				res.render('elpers/imageUpload', { elper });
}

const deleteElpCamp = async (req, res) => {
    const { id } = req.params;
   await Elper.findByIdAndDelete(id);
    res.redirect(`/elpers`);
}
module.exports = { elpHome, renderCreate, renderDetails, renderEdit, createElpCamp, editElpCamp, renderImageUpload, deleteElpCamp};
