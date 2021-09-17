const Elper = require('../models/elper.js')
const { cloudinary } = require('../cloudinary/index')
const  mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapboxToken = process.env.mapbox_token;
const geocoding = mbxGeocoding({ accessToken: mapboxToken });
let elperIds =[];
const elpHome = async (req, res) => { 
let limit = 20;
const elper = await Elper.paginate({},{ page: 1, limit: limit})
const elpers = elper.docs;
const page = elper.page
res.render('elpers/index', { elpers, limit , page});
}

const searchCamp = async (req, res) => {
if(req.query.search.length >= 3){
const page = false;
const elpers = await Elper.find({location:{$regex: req.query.search, $options: 'i'}})
return res.render('elpers/index', { elpers, page })
}
req.flash('error', 'Please enter a more specific location')
res.redirect('/elpers');
return;
}

const postSearch = async (req, res) => {
const limit = 20;
if(req.body.page){
const elper = await Elper.paginate({}, { page: req.body.page, limit: limit});
return res.json(elper)
}
};

const sortElpers = async(req, res) => {
if(req.body.page){
const elpers = await Elper.paginate({},{ page: req.body.page, limit: 20, sort: req.body.sort})
res.send(elpers)
} else {
const elpers = await Elper.paginate({}, {page: 1, limit: 20, sort: req.body.sort});
res.send(elpers);
}
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
    const geoLocation = await geocoding.forwardGeocode({
   query: req.body.location,
   limit : 1
}).send()
   req.body.geometry = geoLocation.body.features[0].geometry
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
   const geoLocation = await geocoding.forwardGeocode({
   query: req.body.location,
   limit : 1
}).send()
   req.body.geometry = geoLocation.body.features[0].geometry
const elperModified = await Elper.findByIdAndUpdate(id, req.body);
    req.flash('success', 'ElpCamp successfully modified')
   return res.redirect(`/elpers/${elperModified._id}`);
    }
    const elper = await Elper.findById(id); 
    const imageUpload = req.files.map(f => ({url: f.path, filename: f.filename}))
    elper.images.push(...imageUpload);
    await elper.save();
    if(req.body.deleteImage){
    for(let imgs of req.body.deleteImage){
     await cloudinary.uploader.destroy(imgs)
    }
    			await elper.updateOne({ $pull: { images: { filename: {$in: req.body.deleteImage } } } } )
    }
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
module.exports = { elpHome,searchCamp, postSearch, sortElpers, renderCreate, renderDetails, renderEdit, createElpCamp, editElpCamp, renderImageUpload, deleteElpCamp};
