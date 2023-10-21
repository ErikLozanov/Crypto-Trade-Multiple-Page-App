const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find().populate('owner');

exports.create = (cryptoData) =>  Crypto.create(cryptoData);

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.buyCrypto = (cryptoId, crypto) => Crypto.findByIdAndUpdate(cryptoId, crypto);