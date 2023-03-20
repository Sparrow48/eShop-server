const jwt = require('jsonwebtoken')

const authenticateUserJWT = (req, res, next) => {
    const authToken = req.headers.authorization

    if (authToken) {

        const token = authToken.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403)
            }

            req.user = user
            next()
        })
    } else {
        res.status(401).send({
            message: 'Unauthorized Access.'
        })
    }

}

module.exports = authenticateUserJWT