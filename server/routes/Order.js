const express = require('express')
const router = express.Router()
const jwtDecode = require('jwt-decode')

const Order = require('./../model/Order')
const authenticateUser = require('./../Middleware/AuthenticateUser')

router.post('/', async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Bad request." })
        return
    }

    try {
        const { name, user, products, paymentMethod, address, phone, deliveryFee, totalDiscount = 0 } = req.body
        let amount = deliveryFee;
        for (let product of products) {
            amount += (product.quantity * product.price)
        }

        const order = new Order({
            name,
            amount,
            user,
            products,
            paymentMethod,
            address,
            phone,
            deliveryFee,
            totalDiscount,
            isDelivered: false
        })

        const ret = await order.save()
        res.json(ret)
    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().
            populate('user', '-password').
            populate('products.product').
            exec();

        res.json(orders).status(200)
    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const authToken = req.headers.authorization
        const token = authToken.split(' ')[1]
        const userData = jwtDecode(token)
        const { uId } = userData

        const orders = await Order.find({}).
            populate('user', '-password').
            populate('product').
            exec();

        res.json(orders).status(200)
    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }
})


router.get('/:_id', async (req, res) => {

    if (!req.params._id) {
        res.status(400).json({ message: "Missing id in query." })
        return
    }

    try {
        const _id = req.params._id
        const order = await Order.findOne({ _id }).
            populate('user', '-password').
            populate('products.product').
            exec();

        if (!order) {
            res.status(404).send({
                message: 'No order found.'
            })
            return
        }

        res.json(order).status(200)
    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }


})

module.exports = router