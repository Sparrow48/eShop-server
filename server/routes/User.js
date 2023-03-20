const express = require('express')
const jwtDecode = require('jwt-decode')
const router = express.Router()

const User = require('./../model/User')
const Order = require('./../model/Order')
const authenticateUser = require('./../Middleware/AuthenticateUser')

router.get('/profile', authenticateUser, async (req, res) => {
    try {
        const authToken = req.headers.authorization
        const token = authToken.split(' ')[1]
        const userData = jwtDecode(token)
        const { uId } = userData
        let user = await User.findById(uId).select("-password")

        if (!user) {
            res.status(404).send({
                message: 'Profile details not found.',
                status: 404
            })
        } else {
            res.json(user).status(200)
        }

    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })

    }
})

router.patch('/', authenticateUser, async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Bad request." })
        return
    }
    try {
        const authToken = req.headers.authorization
        const token = authToken.split(' ')[1]
        const userData = jwtDecode(token)
        const { uId } = userData

        let updateUser = req.body
        const response = await User.findOneAndUpdate({ _id: uId }, updateUser, {
            new: true
        }).select("-password");
        res.json(response).status(200)

    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }
})

router.get('/purchase-history', authenticateUser, async (req, res) => {
    try {
        const authToken = req.headers.authorization
        const token = authToken.split(' ')[1]
        const userData = jwtDecode(token)
        const { uId } = userData
        let purchases = await Order.find({ user: uId }).
            populate('user', '-password').
            populate('product').
            exec();

        res.json(purchases).status(200)

    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })

    }
})

module.exports = router