const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

const connectDB = require('./server/database/connection')
const authRoute = require('./server/routes/Auth')
const productRoute = require('./server/routes/Product')
const orderRoute = require('./server/routes/Order')
const userRoute = require('./server/routes/User')
const fileRoute = require('./server/routes/FileSystem')

const corsOptions = {
    origin: '*',
    Credential: true,
    optionSuccessStatus: 200
}

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))
app.use(morgan('tiny'))
dotenv.config({ path: '.env' })
const PORT = process.env.PORT || 5001

//MongoDB connection
connectDB()

app.get('/', async (req, res) => {
    res.send('Welcome to eShop server.')
})

app.use('/auth', authRoute)
app.use('/product', productRoute)
app.use('/order', orderRoute)
app.use('/user', userRoute)
app.use('/upload', fileRoute)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
})