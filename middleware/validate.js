const {elperSchema, reviewSchema} = require('./validateSchema')
const validateElpers = (req, res, next) => {
    const { error } = elperSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new OnError(`${msg}`, 404)
    } else {
        next();
    }
 }
 
const validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new OnError(`${msg}`, 404)
    } else {
        next();
    }
 }


module.exports = { validateElpers, validateReviews }