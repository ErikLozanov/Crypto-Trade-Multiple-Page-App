const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.register = async (username, email, password, repeatPassword) => {
    // Validate password
    if(password !== repeatPassword) {
        throw new Error('Password mismatch!');
    }

    // TODO: Check if user exists


    // TODO: Validate password

    const hashedPassword = await bcrypt.hash(password, 10);

   await User.create({username, email,password: hashedPassword});
}


