const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const User = require('./../model/User')

router.post('/user', async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Bad request." })
        return
    }

    try {
        const { name, username, email = '', password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const isUserExist = await User.findOne({ username })

        if (isUserExist) {
            res.status(409).send({
                message: 'User already exits with this phone number.'
            })
            return
        }

        const user = new User({
            name,
            username,
            email,
            password: hashPassword
        })

        const ret = await user.save()
        res.json(ret).status(201)

    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
    }
})

module.exports = router