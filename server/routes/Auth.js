const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const User = require('./../model/User')
const { loginSchema, registrationSchema } = require('./../validator/userValidator')

router.post('/user', async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Bad request." })
        return
    }

    try {
        const result = await registrationSchema.validateAsync(req.body)
        const { name, username, email = '', password } = result
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

router.post('/login', async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Bad request." })
        return
    }

    try {
        const result = await loginSchema.validateAsync(req.body)
        let { username, password } = result
        let secret = process.env.JWT_SECRET_ADMIN
        let isUserExist = await User.findOne({ username })

        if (!isUserExist) {
            return res.status(404).json({ message: "No user found with this username." })
        }

        const isPasswordCorrect = await bcrypt.compareSync(password, isUserExist.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password." })
        }

        const sessionId = uuidv4();
        const _currentDate = new Date()
        const iat = (_currentDate.getTime()) / 1000
        const exp = (_currentDate.setDate(_currentDate.getDate() + 1)) / 1000;

        const accessToken = jwt.sign({
            sessionId,
            iat,
            exp,
            userType: 'user',
            uId: isUserExist?._id
        }, secret)

        return res.status(200).json({ accessToken })
    } catch (error) {
        res.status(500).send({
            message: error?.message || 'Something went wrong.'
        })
        return
    }
})

module.exports = router