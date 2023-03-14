const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

const connectDB = require('./server/database/connection')

const corsOptions = {
    origin: '*',
    Credential: true,
    optionSuccessStatus: 200
}

const app = express()
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

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
})