const Elper = require('../models/elper')
const isAuthor = async (req, res, next) => {
	const {id} = req.params;
	const elper = await Elper.findById(id);
	if(!elper.user.equals(req.user._id)){
	  req.flash('error', 'No permission to edit/Modify ElpCamp')
	 return res.redirect(`/elpers/${id}`);
	}
	next();
}

module.exports = isAuthor;
