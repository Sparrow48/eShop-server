const express = require('express')
const router = express.Router()

const Order = require('./../model/Order')

router.post('/', async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Bad request." })
        return
    }

    try {
        const { name, amount, user, product, paymentMethod, address, phone } = req.body
        const createdAt = JSON.parse(JSON.stringify(new Date()))

        const order = new Order({
            name,
            amount,
            user,
            product,
            paymentMethod,
            address,
            phone,
            createdAt
        })

        const ret = await order.save()
        res.json(ret)
    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }
})

module.exports = router