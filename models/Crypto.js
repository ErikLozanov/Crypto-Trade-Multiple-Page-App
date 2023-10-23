const mongoose = require('mongoose');


const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required']
    },
    image: {
        type: String,
        required: [true,'Image is required']
    },
    price: {
        type: Number,
        required: [true,'Number is required']
    },
    description: {
        type: String,
        required: [true,'Description is required']
    },
    payment: {
        type: String,
        required: [true,'Payment is required']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    buyCrypto: {
        type: Array,
    }
});


const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;