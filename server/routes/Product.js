const express = require('express')
const router = express.Router()

const Product = require('./../model/Product')

router.post('/', async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Bad request." })
        return
    }

    try {
        const { title, brand, category, description, image, pId, available, price } = req.body
        const existingProduct = await Product.findOne({ pId })

        if (existingProduct) {
            res.status(409).json({ message: 'Product already exist.' })
            return
        }

        const product = new Product({
            title,
            brand,
            category,
            description,
            image,
            pId,
            available,
            price
        })

        const ret = await product.save()
        res.json(ret)
    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }
})

module.exports = router