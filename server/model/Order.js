const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Order = mongoose.model('order', orderSchema)
module.exports = Order

