const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)


const elperSchema = Joi.object({
    title: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(20),
    description: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML()
})

const reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    review: Joi.string().min(0).escapeHTML()
});

module.exports= {elperSchema, reviewSchema};
