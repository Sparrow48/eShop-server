const express = require('express')
const router = express.Router()

const Product = require('./../model/Product')
const { productSchema } = require('./../validator/ValidateProduct')


router.post('/', async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Bad request." })
        return
    }

    try {
        let response = await productSchema.validateAsync(req.body)
        const { title, brand, category, description, image, pId, available, price } = response
        const existingProduct = await Product.findOne({ title })

        if (existingProduct) {
            throw new Error('Product with this title already exist.');
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

router.get('/', async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Bad request." })
        return
    }

    try {
        let products = await Product.find()
        res.json(products).status(200)
    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }
})


module.exports = router