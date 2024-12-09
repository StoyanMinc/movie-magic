const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const cookieParser = require('cookie-parser');



const SECRET = 'aslfdm30iroq2pwaddsc214'
exports.register = (userData) => {
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
}