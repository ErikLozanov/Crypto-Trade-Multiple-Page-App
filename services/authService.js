const User = require('../models/User');

exports.register = (username, email, password) = User.create({username, password, email});