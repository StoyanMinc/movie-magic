const mongoose = require('mongoose');

function getErrorMessage(error) {

    let message = '';

    if (error instanceof mongoose.MongooseError) {
        message = Object.values(error.errors).at(0).message;

    } else if (error instanceof Error) {
        message = error.message;
    }

    return message;
};

module.exports = getErrorMessage;