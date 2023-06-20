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
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                required: false
            }
        }
    ],
    paymentMethod: {
        type: String,
        required: true
    },
    deliveredTo: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    deliveryFee: {
        type: Number,
        required: true
    },
    totalDiscount: {
        type: Number,
        required: false
    },
    deliveryStatus: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Order = mongoose.model('order', orderSchema)
module.exports = Order

