const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    
    const user = await User.findOne({ email: userData.email });

    if(user) {
        throw new Error('Username already exists!');
    }

    return User.create(userData);
}

exports.login = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Wrong username or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Wrong username or password!');
    }

    const paylod = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(paylod, SECRET, { expiresIn: '2h' });
    return token;
};