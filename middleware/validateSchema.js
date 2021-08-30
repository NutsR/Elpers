const Joi = require('joi');

const elperSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(20),
    img: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required()
})

const reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    review: Joi.string().min(0)
});
const userSchema = Joi.object({
    email: Joi.string().email().required()
});

module.exports= {elperSchema, reviewSchema, userSchema};