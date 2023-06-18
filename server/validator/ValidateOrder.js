const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const { mongodbIdPattern } = require('./../utils/constant')

const JoiObjectId = (message = 'valid id') => Joi.string().regex(/^[0-9a-fA-F]{24}$/, message)

const orderSchema = Joi.object({
    name: Joi.string().min(3).required(),
    user: JoiObjectId().required(),
    products:
        Joi.array().items(
            Joi.object({
                product: JoiObjectId().required(),
                quantity: Joi.number().min(1).required(),
                price: Joi.number().min(100).required(),
                discount: Joi.number().max(100)
            })
        ),
    deliveredTo: Joi.string().min(5).required(),
    paymentMethod: Joi.string().required(),
    phone: Joi.string().min(11).required(),
    deliveryFee: Joi.number().min(0).required(),
    totalDiscount: Joi.number().min(0),
})

module.exports = {
    orderSchema,
}
