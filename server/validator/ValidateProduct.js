const Joi = require('joi')

const productSchema = Joi.object({
    title: Joi.string().min(3).required(),
    brand: Joi.string().min(3).required(),
    category: Joi.string().min(5).required(),
    description: Joi.string().min(15).max(500).required(),
    image: Joi.string().min(5).required(),
    available: Joi.number().min(1).required(),
    price: Joi.number().min(100).required(),
})

module.exports = {
    productSchema,
}
