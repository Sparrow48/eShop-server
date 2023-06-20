const Joi = require('joi')

const loginSchema = Joi.object({
    username: Joi.string().min(13).required().pattern(/^[0-9]+$/).message("Invalid phone number."),
    password: Joi.string().min(5).required(),
})

const registrationSchema = Joi.object({
    name: Joi.string().required().pattern(/^[a-z A-Z ,.'-]+$/i).message("Name should contains only letters and (,.'-) these special characters."),
    username: Joi.string().min(13).required().pattern(/^[0-9]+$/).message("Invalid phone number."),
    password: Joi.string().min(5).required(),
})

module.exports = {
    loginSchema,
    registrationSchema
}
