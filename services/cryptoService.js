const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find().populate('owner');

exports.create = (cryptoData) =>  Crypto.create(cryptoData);

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.buyCrypto = (cryptoId, crypto) => Crypto.findByIdAndUpdate(cryptoId, crypto);

exports.update = (cryptoId, crypto) => Crypto.findByIdAndUpdate(cryptoId, crypto);

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);