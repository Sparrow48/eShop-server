const express = require('express')
const router = express.Router()
const { cloudinary } = require('./../utils/cloudinary')

const authenticateUser = require('./../Middleware/AuthenticateUser')


router.post('/image', authenticateUser, async (req, res) => {
    try {
        const file = req.body.file
        const uploadedResponse = await cloudinary.uploader.upload(file, {
            upload_preset: 'e-shop'
        })
        const { public_id } = uploadedResponse
        res.json({ key: public_id }).status(201)

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })

    }
})

module.exports = router